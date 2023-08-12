const express = require('express');
var router = express.Router();
const app = express();

var multer = require('multer');
var path = require('path');
// const { router } = require('../app');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:\\Ahan's College Documents\\TeachingHub Internship\\Task4C\\resume\\upload");
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname );
  }
})

var upload = multer({ storage: storage });

// Serve the index.html file
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/resume.html');
});

// Handle the file upload
router.post('/upload_resume', upload.single('fileUpload'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // File was uploaded successfully
  res.redirect('/login')
//   res.send('File uploaded!');
});

// Start the server
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

module.exports = router;