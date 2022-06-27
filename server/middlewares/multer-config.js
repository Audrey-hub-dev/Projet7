/*

const multer = require("multer"); // Utilisation de multer

// Gestion des extensions pour le images importées
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

// Gestion de la destination des images importées, ici elles seront placées dans le dossier images du backend
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // Gestion du format du fichier importé
  filename: (req, file, callback) => {
    const name = file.originalname.split('').join('_'); // Remplace les espaces par des underscores
    const extension = MIME_TYPES[file.mimetype]; // Résolution de l'extension du fichier
    callback(null, name + Date.now() + '.' + extension); // Rajout d'un timestamp
  },
});

// Exportation du module pré-configuré
module.exports = multer({ storage: storage }).single('image');
*/



//importation de multer 
const multer = require('multer');

//création des types de fichiers 
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//création d'un objet de configuration pour multer qui sert à indiquer 
//où enregistrer les fichiers entrants
//utilisation de la fonction diskStorage pour enregistrer sur le disque  qui a
//besoin de deux éléments (destination et filename)
const storage = multer.diskStorage({
     //premier argument qui indique à multer d'enregistrer les fichiers dans le dossier images
    destination: (req, file, callback)=> {
        callback(null/* pas d'erreur*/, 'images')
    },
    //deuxième argument indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et 
    //d'ajouter un timestamp Date.now() comme nom de fichier. Elle utilise 
    //la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée. 
    filename: (req, file, callback) => {
        //création du nom du fichier
        const name = file.originalname.split('').join('_');//élimination des espaces remplacés par des underscores
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

//exportation de l'élément multer en lui passant notre constante storage et lui indiquons que nous gérons
//uniquement les téléchargements de fichiers image. 
module.exports = multer({storage: storage}).single('file');//fichier unique et pas un groupe de fichiers avec single
//mmodification effectuée (remplacement 'image' par 'file' en accord avec le frontend)