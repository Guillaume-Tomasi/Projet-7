const db = require('../config/dbConfig');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Récupération de toutes les publications
module.exports.getAllPosts = (req, res) => {
    const getAllPosts = "SELECT * FROM post ORDER BY createdat DESC;";
    db.query(getAllPosts, (err, result) => {
        if (err) {
            return res.status(400).json({ err });
        }
        // res.status(200).json({ result });
        res.send(result);
    })
}

// Récupération d'une publication PAS UTILISE ?
module.exports.getPost = (req, res) => {
    const getPost = `SELECT * FROM post WHERE id = ${req.params.id};`;
    db.query(getPost, (err, result) => {
        if (!result.length) {
            return res.status(404).json({ error: "Publication non trouvée !" });
        }
        if (err) {
            return res.status(400).json({ err: err.sqlMessage });
        } res.send(result);
    })
}

// Création d'une publication
module.exports.createPost = (req, res) => {
    const { content } = req.body;
    const owner_id = req.auth.userId;

    const createPost = `INSERT INTO post ( content, owner_id) VALUES ('${content}', '${owner_id}')`;



    if (req.file) {
        const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const createPostImg = `INSERT INTO post ( content, owner_id, image) VALUES ('${content}', '${owner_id}', '${image}')`;

        db.query(createPostImg, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ err: err.sqlMessage });
            }
            return res.status(200).json({ results })
        })
    } else {
        db.query(createPost, (err, result) => {
            if (err) {
                return res.status(400).json({ err: err.sqlMessage });
            }
            return res.status(200).json({ result })
        })
    }




}

// Modification d'une publication
module.exports.updatePost = (req, res) => {
    const getPost = `SELECT * FROM post WHERE id = '${req.params.id}';`;
    const updatePost = `UPDATE post SET ? WHERE id= '${req.params.id}';`;

    db.query(getPost, (err, result) => {
        if (!result.length) {
            return res.status(404).json({ error: "Publication non trouvée !" })
        }
        if (result[0].owner_id !== req.auth.userId) {
            return res.status(401).json({ error: "Requête non autorisée !" })
        }

        db.query(updatePost, req.body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ err });
            }
            res.status(201).json({ message: 'Publication modifiée !' });
        })

    })

}

// Suppression d'une publication
module.exports.deletePost = (req, res) => {
    const getPost = `SELECT * FROM post WHERE id = '${req.params.id}';`;
    const deletePost = `DELETE FROM post WHERE id = '${req.params.id}';`;

    db.query(getPost, (err, result) => {
        if (!result.length) {
            return res.status(404).json({ error: "Publication non trouvée !" })
        }
        if (result[0].owner_id !== req.auth.userId) {
            return res.status(401).json({ error: "Requête non autorisée !" })
        }

        console.log(result[0].image);
        const filename = result[0].image;

        db.query(deletePost, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ err });
            }
            if (filename) {
                fs.unlink(`images/${filename.split('/images/')[1]
                    }`, (err => {
                        if (err) {
                            console.log(err);
                            return res.status(400).json({ err });
                        }
                    }));
            }
            res.status(201).json({ message: 'Publication supprimée !' });
        })


    })
}





