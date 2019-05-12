var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passportHandlerLocal = require('./utils/handlers/passport_local')
var passportHandler = require('./utils/handlers/passport');
//var passportHandlerFb = require('./utils/handlers/passport_facebook');
//var passportHandlerTwitter = require('./utils/handlers/passport_twitter');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/authorize');
var questionRouter = require('./routes/question');
var questionByIdRouter = require('./routes/questionById');
var apiRouter = require('./routes/api/v1');
var searchRouter = require('./routes/search');

var app = express();
app.conf = require('./config/app')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var cooky = {
	secret: 'work hard',
  	resave: true,
  	expires: new Date() * 60 * 60 * 24 * 30,
  	saveUninitialized: true
}

passportHandlerLocal(passport);
passportHandler(passport);
//passportHandlerFb(passport);
//passportHandlerTwitter(passport);

app.set('trust proxy', 1) // trust first proxy
app.use(session(cooky))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  if (req.session.user) return next();
  if(!req.url.startsWith('/authorize')) return res.redirect('/authorize');
  next();
}

app.use(isLoggedIn);
app.use('/', isLoggedIn, indexRouter);
app.use('/authorize', authRouter);
app.use('/api', apiRouter);
app.use('/ask', questionRouter);
app.use('/question', questionByIdRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
