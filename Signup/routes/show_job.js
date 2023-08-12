var express = require('express');
var router = express.Router();
var db = require('../database_job');


router.get('/', function (req, res, next) {
    res.render('show_job_form', { title: 'Showing Job Notifications' })
  })
  
router.post('/show_job_table', function (req, res, next) {

var jobrole = req.body.jobrole
var jobcity = req.body.jobcity
db.query(`SELECT jobrole, jobcity, jobcompany, salary FROM job WHERE jobrole = "${jobrole}" and jobcity = "${jobcity}" order by salary DESC`, function (err, rows) {
if (err) {
    req.flash('error', err)
    res.render('show_job_table', { data: '' })
} else {
    res.render('show_job_table', { data: rows })
}
});
});
module.exports = router;