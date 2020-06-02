//import modules
const express = require('express');
const bodyParser = require('body-parser');
const searchRouter = require('./routers/articleRouter');
const submitRouter = require('./routers/userRouter');
const moderatorSchema = require('./models/moderatorModels');
const app = express();

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/article', searchRouter);
app.use('/api/v1/user', submitRouter);
app.use('/', express.static(__dirname + '/frontend'));

module.exports = app;
