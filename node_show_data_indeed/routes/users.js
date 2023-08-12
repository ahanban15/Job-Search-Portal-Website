// var express = require('express')
// var connection = require('../database.js')
// var router = express.Router()

// router.get('/users', function (req, res, next) {
//   var jobrole = req.body.jobrole
//   var jobcity = req.body.jobcity
//   connection.query(`SELECT jobrole, jobcity, jobcompany FROM job WHERE jobrole = "${jobrole}" and jobcity = "${jobcity}"` , function (err, rows) {
//     if (err) {
//       req.flash('error', err)
//       res.render('profile', { data: '' })
//     } else {
//       res.render('profile', { data: rows })
//     }
//   })
// })
// module.exports = router
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
