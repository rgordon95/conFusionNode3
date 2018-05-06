var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//replace default express parser
var bodyParser = require('body-parser');
//replaced cookieParser
var session = require('express-session');
var FileStore = require('session-file-store')(session);
//for passport / local
var passport = require('passport');
var authenticate = require('./authenticate')
var config = require('./config');

//routes
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var uploadRouter = require('./routes/uploadRouter');
//import dishes
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//import models
const Dishes = require('./models/dishes.js');
const Promos = require('./models/promotions.js');
const Leaders = require('./models/leaders.js')
// Connection url
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("connected correctly to server");
});

var app = express();

//secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// app.use(cookieParser('12345-43210-12345-43210')); //replaced by express-session
/* //removed when switching from session module to jwtPassport
app.use(session({
  name: 'session-id',
  secret: '12345-43210-12345-43210',
  saveUnitialized: false,
  resave: false,
  store: new FileStore() //external module
}));
*/
app.use(passport.initialize());
// app.use(passport.session()); //removed (session module swap for jwtPassport)

//pages accessed without authentication
app.use('/', indexRouter);
app.use('/users', userRouter);

/* //removed when adding in token auth system with jwtPassport module
//this auth method uses the express-session module
function auth(req, res, next) {
  //  console.log(req.headers);
  //  console.log(req.signedCookies);
  console.log(req.user)
  if (!req.user) { //session replaced cookies method when using express-session over cookieParser
    var err = new Error('You are not authenticated!');
    err.status = 403;
    next(err);
    return;
  } else {
    next();
  }
}

app.use(auth);
//end removed local auth method
*/

app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload', uploadRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;