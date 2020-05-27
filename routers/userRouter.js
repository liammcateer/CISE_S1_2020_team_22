//import modules
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .post(userController.submitArticle)
  .patch(userController.updateArticle)
  .get(userController.getAllUsers);

router
  .route('/authorize')
  .post(userController.signup)
  .get(userController.login);

module.exports = router;
