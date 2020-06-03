/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable prettier/prettier */
//import modules
const Article = require('../models/articleModels');
const ModeratorArticles = require('../models/moderatorModels')
const Reject = require('../models/rejectedModels');

/*
Method for Normal User
*/
//Search article by user
exports.searchArticle = async (req, res) => {
  try{
    const queryObj = { ...req.query };
    const excluded = ['page', 'sort', 'limit', 'fields'];
    excluded.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|regex|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = Article.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('year');
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 15;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const articles = await query;
    
    //const articles = await Article.find();

    res.status(200).json({
      status: 'success',
      data: {
        article: articles,
      }
    })
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//submit new article from submitter, the new article will enter the moderator queue
exports.submitNewArticle = async (req, res) => {
  try{
    const newArticle = await ModeratorArticles.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        article: newArticle,
      }
    })
  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

/*
Method for Administrator
*/
//get a specific article by articled id, this feature might be only used by administrator
exports.getArticle = async(req, res) => {
 
  try{
    const articles = await Article.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        article: articles,
      }
    });
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    });
  }
};

//update article by articled id, this feature might be only used by administrator
exports.updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        article: updatedArticle,
      }
    })
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//update article by articled id, this feature might be only used by administrator
exports.deleteArticle = async (req, res) => {
  try{
    await Article.findOneAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Article delete successed'
    })
  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

/*
Method for Moderator
*/
//get all articles that need to be checked
exports.moderatorArticles = async (req, res) => {
  try{
    const articles = await ModeratorArticles.find({status: {$ne: true},  rejected: {$ne: true}})

    res.status(200).json({
      status: 'success',
      data: {
        article: articles,
      }
    })
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//update article status to valid (false = unmodified and true = modified and ready to analyse)
exports.updateStatusByModerator = async (req, res) => {
  try {
    const updatedArticle = await ModeratorArticles.findByIdAndUpdate(req.params.id, {status: true}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        article: updatedArticle,
      }
    })
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//Get a specific rejected article from database, search by the name of an article
exports.getRejectedArticle = async(req, res) => {
  try{
    const articles = await ModeratorArticles.find({title: req.params.title, rejected: true});
    res.status(200).json({
      status: 'success',
      data: {
        article: articles,
      }
    });
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    });
  }
};

//check if the article is already in the queue or already rejected
exports.checkArticle = async(req, res) => {
  try{
    const articles = await ModeratorArticles.find({title: req.params.title});
    console.log(articles);
    console.log(articles[0].rejected);
    if(articles[0].rejected===false){
      res.status(200).json({
        status: 'success',
        messahe: 'The article has already in the queue',
        data: {
          article: articles,
        }
      });
    }else if(articles[0].rejected===true){
      res.status(200).json({
        status: 'success',
        messahe: 'The article has rejectred',
        data: {
          article: articles,
        }
      });
    }else{
      res.status(200).json({
        status: 'success',
        message: 'this article is not in the queue',
      });
    }
    
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err
    });
  }
};


//create new reject article
exports.createReject = async(req, res) => {
  try{
    const newArticle = await ModeratorArticles.findOneAndUpdate(req.params.title, {rejected: true, rejectMessage: req.body.rejectMessage}, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        article: newArticle,
      }
    })
  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//delete invalid article from moderator/analyst queue, this method might be also used by analyst
exports.deleteInvalidArticle = async (req, res) => {
  try{
    await ModeratorArticles.findOneAndDelete({_id: req.params.id});

    res.status(200).json({
      status: 'success',
      message: 'Article delete successed',
    })
  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

/*
Method for Analyste
*/
//get all new articles which moderated by moderator
exports.analysteArticles = async (req, res) => {
  try{
    const articles = await ModeratorArticles.find({status: {$ne: false}, rejected: {$ne: true}})

    res.status(200).json({
      status: 'success',
      data: {
        article: articles,
      }
    })
  }catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

//analyste submit article into the article database
exports.submitArticle = async (req, res) => {
  try{
    const newArticle = await Article.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        article: newArticle,
      }
    })
  }catch(err){
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

