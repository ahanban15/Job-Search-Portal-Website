var express = require('express');
var router = express.Router();
var createError = require('http-errors')
var session = require('express-session')
var flash = require('express-flash')
var express = require('express')
var logger = require('morgan')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var db = require('./database')

var indexroute = require('./routes/index')
var loginroute = require('./routes/login')
var usersroute = require('./routes/users')
var resumeroute = require('./routes/resume')
var addjobroute = require('./routes/add_job')
var showjobroute = require('./routes/show_job')
var profileupdateroute = require('./routes/profile_update')
var showprofileroute = require('./routes/show_profile')
var applyroute = require('./routes/apply')
var logoutroute = require('./routes/logout')

// const ejsLint = require('ejs-lint');

var app = express()

// ejsLint("header.ejs", )
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: '123@123abc',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
)
app.use(flash())

app.use('/', indexroute);
app.use('/users', usersroute);
app.use('/login', loginroute);
app.use('/resume', resumeroute);
app.use('/add_job', addjobroute);
app.use('/show_job', showjobroute);
app.use('/profile_update', profileupdateroute);
app.use('/show_profile', showprofileroute);
app.use('/apply', applyroute);
app.use('/logout', logoutroute);

// app.get('/', function (req, res, next) {
//   res.render('index', { title: 'User Form' })
// })

// app.post('/user_form', function (req, res, next) {
//   var user_id = req.body.user_id
//   var user_email = req.body.user_email
//   var user_password = req.body.user_password
//   var user_session_id = req.body.user_session_id
//   // var message = req.body.message
//   var sql = `INSERT INTO user_login (user_id, user_email, user_password, user_session_id) VALUES ("${user_id}", "${user_email}", "${user_password}", "${user_session_id}")`
//   db.query(sql, function (err, result) {
//     if (err) throw err
//     console.log('New user added to the database!')
//     req.flash('success', 'Successful Signup!')
//     // res.render(result.message)
//     // console.log(result[0].message)
//     // res.redirect('/')
//     res.redirect('/login')
//     // if (err) {
//     //   req.flash('error', err)
//     //   res.render(' ')
//     // } else {
//     //   res.render(result)
//     // }
//   })
// })

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

app.listen(5555, function () {
  console.log('Node server is running on port : 5555')
})
module.exports = app