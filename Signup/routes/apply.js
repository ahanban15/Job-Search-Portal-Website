var express = require('express');
var router = express.Router();
var db = require('../database_apply');


router.get('/', function (req, res, next) {
    res.render('apply_form', { title: 'Apply Form' })
  })

router.post('/apply_form', function (req, res, next) {
var user_email = req.body.user_email
var jobrole = req.body.jobrole
var jobcity = req.body.jobcity
var jobcompany = req.body.jobcompany

var sql = `INSERT INTO apply (user_email, jobrole, jobcity, jobcompany) VALUES ("${user_email}", "${jobrole}", "${jobcity}", "${jobcompany}")`

db.query(sql, function (err, result) {
    if (err) throw err
    console.log('Application stored')
    req.flash('success', 'Successfully applied for job!')
    // res.render(result.message)
    // console.log(result[0].message)
    res.redirect('/show_job')
    // if (err) {
    //   req.flash('error', err)
    //   res.render(' ')
    // } else {
    //   res.render(result)
    // }
});
});

module.exports = router;