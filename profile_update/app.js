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
  res.render('index', { title: 'Profile Form' })
})

app.post('/profile_form', function (req, res, next) {
  var user_email = req.body.user_email
  var name = req.body.name
  var phone_num = req.body.phone_num
  var role = req.body.role
  var address = req.body.address
  // var message = req.body.message
  var sql = `INSERT INTO profile (user_email, name, phone_num, role, address) VALUES ("${user_email}", "${name}", "${phone_num}", "${role}", "${address}")`
  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('New profile added to the database!')
    req.flash('success', 'Profile successfully updated!')
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
