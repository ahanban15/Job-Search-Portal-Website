var createError = require('http-errors')
var session = require('express-session')
var flash = require('express-flash')
var express = require('express')
var logger = require('morgan')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var db = require('./database')
var app = express()
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
app.get('/', function (req, res, next) {
  res.render('index', { title: 'User Form' })
})
app.post('/user_form', function (req, res, next) {
  var jobrole = req.body.jobrole
  var jobcity = req.body.jobcity
  var jobcompany = req.body.jobcompany
  var salary = req.body.salary
  // var message = req.body.message
  var sql = `INSERT INTO job (jobrole, jobcity, jobcompany, salary) VALUES ("${jobrole}", "${jobcity}", "${jobcompany}", "${salary}")`
  // var sql = `select * from users where name = "${name}" and email = "${email}"`
  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('Row has been updated')
    req.flash('success', 'Job Notified!')
    // res.render(result.message)
    // console.log(result[0].message)
    res.redirect('/')
    // if (err) {
    //   req.flash('error', err)
    //   res.render(' ')
    // } else {
    //   res.render(result)
    // }
  })
})
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