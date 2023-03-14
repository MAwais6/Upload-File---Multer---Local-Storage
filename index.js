const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!')
    }
);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let folder;
      if (file.mimetype.startsWith('image/')) {
        folder = 'uploads/images/';
      } else if (file.mimetype.startsWith('audio/')) {
        folder = 'uploads/audios/';
      } else if (file.mimetype.startsWith('video/')) {
        folder = 'uploads/videos/';
      } else {
        return cb(new Error('File type not supported'));
      }
      cb(null, folder);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
      const allowedTypes = ['image/jpeg', 'image/png', 'audio/mp3', 'video/mp4' , 'video/quicktime' , "audio/mpeg"];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only JPEG, PNG, MP3, and MP4 files are allowed'));
      }
      cb(null, true);
    }
  });
  
  app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
  });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
);

