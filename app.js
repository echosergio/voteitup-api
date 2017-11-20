var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./models');
var routes = require('./routes');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var auth = require("./passport-auth.js")();
app.use(auth.initialize());

// mount all routes on /api path
app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err);
  res.sendStatus(err.status || 500);
});

if (process.env.NODE_ENV == 'development') {
  db.sequelize.sync({
    force: true
  }).then(() => {
    require('./db/seed.js')(db);
  });
}

module.exports = app;