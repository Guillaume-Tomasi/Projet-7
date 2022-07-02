const db = require('../config/dbConfig');
const jwt = require('jsonwebtoken');

// Récupération de toutes les publications
module.exports.getAllPosts = (req, res) => {
    const getAllPosts = "SELECT * FROM post;";
    db.query(getAllPosts, (err, result) => {
        if (err) {
            return res.status(400).json({ err });
        }
        res.status(200).json({ result });
    })
}

// Récupération d'une publication
module.exports.getPost = (req, res) => {
    const getPost = `SELECT * FROM post WHERE id = ${req.params.id};`;
    db.query(getPost, (err, result) => {
        if (!result.length) {
            return res.status(404).json({ error: "Publication non trouvée !" });
        }
        if (err) {
            return res.status(400).json({ err: err.sqlMessage });
        } res.status(200).json({ result });
    })
}

// Création d'une publication
module.exports.createPost = (req, res) => {
    const { title, content } = req.body;
    const owner_id = req.auth.userId;
    const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const createPost = `INSERT INTO post (title, content, owner_id) VALUES ('${title}', '${content}', '${owner_id}')`;
    const insertImg = `INSERT INTO post (image) VALUES (${image});`;

    db.query(createPost, req.body, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ err: err.sqlMessage });
        }

        res.status(201).json({ message: "Nouvelle publication créée !" })
    })
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

        db.query(deletePost, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ err });
            }
            res.status(201).json({ message: 'Publication supprimée !' });
        })

    })
}





