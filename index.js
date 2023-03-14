const express = require('express');
const multer = require('multer');
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
            cb(null, file.originalname + '-' + Date.now() + '.jpg')
        }
    });
    const upload = multer({ storage: storage }).single('user_image');
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

