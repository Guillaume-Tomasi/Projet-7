const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription utilisateur + cryptage mot de passe

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            req.body.password = hash;

            const createUser = "INSERT INTO user SET ?;";
            const findUserName = `SELECT username FROM user WHERE username = '${req.body.username}';`;
            const findEmail = `SELECT email FROM user WHERE email = '${req.body.email}';`;

            if (req.body.isadmin) {
                return res.status(401).json({ err: "Vous ne pouvez pas modifier un rôle" })
            } else {
                db.query(findUserName, (err, result) => {
                    if (result.length) {
                        return res.status(400).json({ err: "Nom d'utilisateur déjà existant !" });
                    } else {
                        db.query(findEmail, (err, result) => {
                            if (result.length) {
                                return res.status(400).json({ err: "Email déjà existant !" });
                            } else {
                                db.query(createUser, req.body, (err, result) => {
                                    if (err) {
                                        return res.status(400).json({ err: err.sqlMessage });
                                    }
                                    res.status(201).json({ message: "Compte créé !" });
                                })
                            }
                        })
                    }
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
};


// Connexion utilisateur 

exports.login = (req, res, next) => {
    const findUser = `SELECT * FROM user WHERE email = '${req.body.email}';`;

    db.query(findUser, (err, result) => {
        if (!result.length) {
            return res.status(401).json({ error: "Email incorrect !" });
        }
        bcrypt.compare(req.body.password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: result[0].id,
                    token: jwt.sign(
                        { userId: result[0].id },
                        'TOKEN_SECRET',
                        { expiresIn: '24h' },
                    )
                });

            })
    })
}

// Récupération d'un utilisateur

module.exports.getUser = (req, res) => {
    const getUser = `SELECT id, username, email, isadmin FROM user WHERE id = ${req.params.id};`;
    db.query(getUser, (err, result) => {
        if (!result) {
            return res.status(404).json({ error: "Utilisateur non trouvé !" });
        }
        if (err) {
            return res.status(400).json({ err: err.sqlMessage });
        } res.send(result);
    })
}

// Récupération de tous les utilisateurs

module.exports.getAllUsers = (req, res) => {
    const getAllUsers = `SELECT id, username, email, isadmin FROM user;`;
    db.query(getAllUsers, (err, result) => {
        if (!result) {
            return res.status(404).json({ error: "Utilisateurs non trouvés !" });
        }
        if (err) {
            return res.status(400).json({ err: err.sqlMessage });
        } res.send(result);
    })
}
