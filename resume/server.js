const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'D:\\' }); // Specify the directory to store uploaded files

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
  res.send('File uploaded!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
