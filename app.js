"use strict"

var express = require('express');
var logger = require('morgan');
var path = require('path');

var root = require('./routes/root');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

var app_route = express.Router();

app.use('/polygraph', app_route);
app.get('/', function(req, res) {
  res.redirect('/polygraph');
});

app_route.use('/js', express.static('build/js'));
app_route.use('/css', express.static('build/css'));
app_route.use('/', root);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
