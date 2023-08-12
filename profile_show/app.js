var createError = require('http-errors')
var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var flash = require('express-flash')
var cookieParser = require('cookie-parser')
// var expressValidator = require('express-validator')
var session = require('express-session')
var mysql = require('mysql')
var connection = require('./database')
var nodeRoutes = require('./routes/index')
var userRoute = require('./routes/users')
var app = express()
// var expressValidator = expressValidator();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: '123@abcd',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
)
// app.use(expressValidator())
app.use(flash())

app.use('/', nodeRoutes)
// app.use('/users', userRoute)
app.get('/', function (req, res, next) {
  res.render('index', { title: 'User Form' })
})

app.post('/user_form', function (req, res, next) {

var user_email = req.body.user_email
connection.query(`SELECT user_email, name, phone_num, role, address FROM profile WHERE user_email = "${user_email}"` , function (err, rows) {
  if (err) {
    req.flash('error', err)
    res.render('profile', { data: '' })
  } else {
    res.render('profile', { data: rows })
  }
})
})

app.use(function (req, res, next) {
  next(createError(404))
})
app.listen(3030, function () {
  console.log('Node server running on port : 3030')
})
// error
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})
module.exports = app