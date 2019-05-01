const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const api = require('./api/index');
const usersRouter = require('./routes/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



const app = express();
app.use(bodyParser.json({limit:'50mb'}));
 app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));

//app.use(cors())
//CORS bypass
app.use(function (req, res, next) {
  //must be included these first two
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});


//mongoDb connexion
//local db
//mongoose.connect('mongodb://127.0.0.1:27017/zaid',{useNewUrlParser:true})
//atlas db

mongoose.connect("mongodb+srv://zaid:zaid4mongo159***@cluster0-21hrt.azure.mongodb.net/chercheur?retryWrites=true", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB')
})
// view engine setup
//app.set('views', path.join(__dirname, 'views'));

app.use(express.static("views/angular/dist/hackaton"));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api', api)



app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



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
  res.json({
    message: err.message,
    error: err
    });
});

module.exports = app;
