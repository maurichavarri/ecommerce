const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/img/categorias'));
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '_IMG' + path.extname(file.originalname);
        cb(null, fileName);
    }
})

const uploadFile = multer({ storage });

module.exports = uploadFile;