const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!')
    }
);


app.post('/upload', (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    });
    const upload = multer({ 
        storage: storage,
        fileFilter: function (req, file, cb) {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true)
            } else {
                cb(null, false)
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        }
    }).single('user_image');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    }
);

