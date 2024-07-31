const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const app = express();
const upload = multer({ dest: 'public/uploads/' });

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('form');
});

app.post('/submit', upload.single('photo'), async (req, res) => {
    const { name, rank, idNumber } = req.body;
    const photoPath = req.file.path;

    const outputFilePath = `public/uploads/output-${Date.now()}.jpg`;
    await sharp(photoPath)
        .resize(150, 150)
        .toFile(outputFilePath);

    res.render('result', {
        name,
        rank,
        idNumber,
        photo: outputFilePath.replace('public', '')
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
