//import modules
const express = require('express');
const articleController = require('../controllers/articleController');

const router = express.Router();

router
  .route('/')
  .get(articleController.searchArticle)
  .get(articleController.getArticle)
  .post(articleController.submitArticle);

router
  .route('/:id')
  .get(articleController.getArticle)
  .patch(articleController.updateArticle)
  .delete(articleController.deleteArticle);

module.exports = router;
