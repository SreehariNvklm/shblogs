var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const Blog = require('./models/blog');

var app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://sreehari:test1234@nodetuts.kux8uaw.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI).then((result) => console.log('Connected to database')).catch((error) => console.error(error));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/add-blog',(req,res)=>{
  const blog = new Blog({
    title:'new blog',
    snippet:'test snippet',
    body:'Test body'
  });

  blog.save().then((result)=>{
    res.send(result);
  }).catch((error)=>{
    res.send(error);
  });
})

app.get('/all-blogs',(req,res)=>{
  Blog.find()
    .then((result)=>{
      res.send(result);
    }).catch((error)=>{
      res.send(error);
    })
});

app.get('/single-blog',(req,res)=>{
  Blog.findById('63629e0d8e38f0d3e1979538').then((result)=>{res.send(result)}).catch((error)=>{res.send(error)});
})

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
