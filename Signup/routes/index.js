var express = require('express');
var router = express.Router();

var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'User Form' });
});

// app.get('/', function (req, res, next) {
//   res.render('index', { title: 'User Form' })
// })

// app.post('/user_form', function (req, res, next) {
router.post('/user_form', function (req, res, next) {
  var user_id = req.body.user_id
  var user_email = req.body.user_email
  var user_password = req.body.user_password
  var user_session_id = req.body.user_session_id
  
  var sql = `INSERT INTO user_login (user_id, user_email, user_password, user_session_id) VALUES ("${user_id}", "${user_email}", "${user_password}", "${user_session_id}")`
  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('New user added to the database!')
    req.flash('success', 'Successful Signup!')
    // res.render(result.message)
    // console.log(result[0].message)
    // res.redirect('/')
    res.redirect('/login')
    // if (err) {
    //   req.flash('error', err)
    //   res.render(' ')
    // } else {
    //   res.render(result)
    // }
  })
})


module.exports = router;
