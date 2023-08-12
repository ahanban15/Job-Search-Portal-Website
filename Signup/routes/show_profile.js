var express = require('express');
var router = express.Router();
var db = require('../database_profile');

router.get('/', function (req, res, next) {
    res.render('show_profile_form', { title: 'Show Profile Form' })
  })
  
router.post('/show_profile_table', function (req, res, next) {

var user_email = req.body.user_email
db.query(`SELECT user_email, name, phone_num, role, address FROM profile WHERE user_email = "${user_email}"` , function (err, rows) {
if (err) {
    req.flash('error', err)
    res.render('show_profile_table', { data: '' })
} else {
    res.render('show_profile_table', { data: rows })
}
})
})
module.exports = router;