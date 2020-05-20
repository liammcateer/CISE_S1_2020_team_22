/* eslint-disable prettier/prettier */
//import modules
const Article = require('../models/articleModels');
const APIFeatures = require("../utils/features");

exports.searchArticle = async (req, res) => {
  try{
    const features = new APIFeatures(Article.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const articles = await features.query;
    
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

//submit
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

//get a specific article by articled id, this feature might be only used by administrator
exports.getArticle = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
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
