// const db = require('../config/dbConfig');


// // Récupération de tous les commentaires d'une publication
// module.exports.getAllComments = (req, res) => {
//     const getAllComments = `SELECT * FROM comment JOIN post ON comment.post_id = post.id;`;
//     db.query(getAllComments, (err, result) => {
//         if (err) {
//             return res.status(400).json({ err });
//         }
//         res.status(200).json({ result });
//     })
// }

// // Récupération d'un commentaire
// module.exports.getComment = (req, res) => {
//     const getComment = `SELECT * FROM comment WHERE id =${req.params.id};`;
// }

// // Création d'un commentaire
// module.exports.createComment = (req, res) => {

// }

// // Modification d'un commentaire
// module.exports.updateComment = (req, res) => {

// }

// // Suppression d'un commentaire
// module.exports.deleteComment = (req, res) => {

// }