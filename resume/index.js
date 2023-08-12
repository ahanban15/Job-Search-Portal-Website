const express = require('express');
const app = express();

var multer = require('multer');
var path = require('path');

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
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle the file upload
app.post('/upload', upload.single('fileUpload'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // File was uploaded successfully
  res.redirect('/')
//   res.send('File uploaded!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
