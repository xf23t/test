var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var join = require('./routes/join');
var login = require('./routes/login');
var logout = require('./routes/logout');
var usermodel = require('./routes/usermodel');
var nick = require('./routes/nick');
var profile = require('./routes/profile');
var board = require('./routes/board');
var board_best = require('./routes/board_best');
var board_update = require('./routes/board_update');
var board_write = require('./routes/board_write');
var board_delete = require('./routes/board_delete');
var board_like_update = require('./routes/board_like_update');
var entire_board = require('./routes/entire_board'); 
var comment = require('./routes/comment');
var comment_update = require('./routes/comment_update');
var mypage = require('./routes/mypage');
var myquestion = require('./routes/myquestion');
var mycomment = require('./routes/mycomment');
var mylike = require('./routes/mylike');
var interested_class = require('./routes/interested_class');
var join_ok = require('./routes/join_ok');
var comment_write = require('./routes/comment_write');
var nick_change = require('./routes/nick_change');
var comment_like_update = require('./routes/comment_like_update');
var all_board = require('./routes/all_board');
var comment_delete = require('./routes/comment_delete');
var search = require('./routes/search');
//var pic_upload = ('./routes/pic_upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/join', join);
app.use('/login', login);
app.use('/logout', logout);
app.use('/usermodel', usermodel);
app.use('/board',board);
app.use('/nick',nick);
app.use('/profille',profile);
app.use('/board_best',board_best);
app.use('/board_write',board_write);
app.use('/board_delete',board_delete);
app.use('/entire_board',entire_board);
app.use('/board_update',board_update);
app.use('/board_like_update',board_like_update);
app.use('/mypage', mypage);
app.use('/myquestion', myquestion);
app.use('/mycomment', mycomment);
app.use('/mylike',mylike);
app.use('/interested_class', interested_class);
app.use('/comment',comment);
app.use('/comment_update',comment_update);
app.use('/join_ok',join_ok);
app.use('/comment_write',comment_write);
app.use('/nick_change', nick_change);
app.use('/comment_like_update', comment_like_update);
app.use('/all_board',all_board);
app.use('/comment_delete', comment_delete);
app.use('/search', search);
//app.use('/pic_upload',pic_upload);

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
