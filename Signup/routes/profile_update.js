var express = require('express');
var router = express.Router();
var db = require('../database_profile');

router.get('/', function (req, res, next) {
  res.render('profile_update', { title: 'Profile Form' })
})

router.post('/profile_form', function (req, res, next) {
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
    res.redirect('/show_profile')
    // if (err) {
    //   req.flash('error', err)
    //   res.render(' ')
    // } else {
    //   res.render(result)
    // }
  })
})

module.exports = router;