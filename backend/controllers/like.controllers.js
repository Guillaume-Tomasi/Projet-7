const db = require('../config/dbConfig');

// Récuperation de tous les likes
module.exports.getAllLikes = (req, res) => {
    const getAllLikes = "SELECT * FROM likes;";

    db.query(getAllLikes, (err, result) => {
        if (err) {
            return res.status(400).json({ err });
        }
        res.send(result);
    })
};



// Création d'un like
module.exports.createLike = (req, res) => {
    const owner_id = req.auth.userId;
    const post_id = req.body.post_id;
    const type = req.body.type;
    const getLike = `SELECT * FROM likes WHERE user_id = '${owner_id}' AND post_id = ${post_id};`;
    const createLike = `INSERT INTO likes (post_id, user_id, type) VALUES ('${post_id}', '${owner_id}', '${type}');`;

    db.query(getLike, (err, result) => {
        if (result.length) {
            if (result[0].type === 1) {
                return res.status(400).json({ err: "Vous avez déjà liké cette publication" })
            } else if (result[0].type === -1) {
                return res.status(400).json({ err: "Vous avez déjà disliké cette publication" })

            }
        } else {
            db.query(createLike, (err, result) => {
                if (err) {
                    return res.status(400).json({ err: "Un problème est survenu" });
                }
                return res.status(200).json({ message: 'Like ajouté' })
            })
        }
    })




}



// Suppression d'un like
module.exports.deleteLike = (req, res) => {
    const getLike = `SELECT * FROM likes WHERE id = '${req.params.id}';`;
    const deleteLike = `DELETE FROM likes WHERE id = '${req.params.id}';`;


    db.query(getLike, (err, result) => {
        if (!result.length) {
            return res.status(404).json({ error: "like non trouvé !" })
        }
        if (result[0].user_id !== req.auth.userId) {
            return res.status(401).json({ error: "Requête non autorisée !" })
        }
        db.query(deleteLike, (err, result) => {
            if (err) {
                return res.status(400).json({ err: err.sqlMessage });
            }
            res.status(200).json({
                message: 'Un like de moins !'
            });
        });
    });





}