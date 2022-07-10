const multer = require('multer');
const fs = require('fs');
const dir = './images';

// Création du dossier images si inexistant

fs.access(dir, (error) => {
    if (error) {
        fs.mkdir(dir, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Dossier "images" créé !');
            }
        });
    } else {
        console.log('Dossier "images" présent !');
    }
});

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

// Stockage de l'image

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    },

});

// Vérification du format d'image

module.exports = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const extension = MIME_TYPES[file.mimetype];
        if (extension !== 'jpg' && extension !== 'png' && extension !== 'gif') {
            return callback(new Error("Format d'image invalide !"))
        }
        callback(null, true)
    }
}).single('image');