var express = require('express');
var router = express.Router();
var db = require('../database_job');

router.get('/', function (req, res, next) {
    res.render('add_job', { title: 'Add Job form' })
  });

router.post('/add_job_form', function (req, res, next) {
  var jobrole = req.body.jobrole
  var jobcity = req.body.jobcity
  var jobcompany = req.body.jobcompany
  var salary = req.body.salary
  // var message = req.body.message
  var sql = `INSERT INTO job (jobrole, jobcity, jobcompany, salary) VALUES ("${jobrole}", "${jobcity}", "${jobcompany}", "${salary}")`

  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('Row has been updated')
    req.flash('success', 'Job Notified!')
    
    res.redirect('/show_job')
    // if (err) {
    //   req.flash('error', err)
    //   res.render(' ')
    // } else {
    //   res.render(result)
    // }
  })
})

module.exports = router;