//import modules
const express = require('express');
const bodyParser = require('body-parser');
const searchRouter = require('./routers/articleRouter');
const submitRouter = require('./routers/userRouter');
const frontendRouter = require('./routers/frontendRouter');
const moderatorSchema = require('./models/moderatorModels');
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: true });

//middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.get('/', (rep, res) => {
//   res.status(200).json({
//     message: 'Hello',
//   });
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Post Request to Submit Article
app.post('/api/v1/article/moderator', urlencodedParser, function(req, res, next){
  var post = new moderatorSchema({
    title: req.body.title,
    detail: req.body.author + ' ' + req.body.year + ' ' + req.body.title + ' ' + req.body.journel + ' ' + req.body.volume + ' ' + req.body.startPage + '-' + req.body.endPage,
  })
  post.save(function (err, post) {
    if (err) { return next(err) }
    res.redirect('/submit');
  })
});

app.use('/api/v1/article', searchRouter);
app.use('/api/v1/user', submitRouter);
app.use('/', frontendRouter);

module.exports = app;
