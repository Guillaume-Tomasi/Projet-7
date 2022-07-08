const db = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription utilisateur
exports.signup = (req, res, next) => {

    // Réinitialisation de l'id si aucun utilisateur
    const countUser = "SELECT COUNT(*) AS user_count FROM user;";

    db.query(countUser, (err, results) => {
        if (results[0].user_count == '0') {
            db.query("ALTER TABLE user AUTO_INCREMENT = 1;", (err, result) => {
                console.log("reset de l'AI");
            });
        } else {
            console.log("Pas reset de l'AI");
        };
    });




    // Création du compte + cryptage mot de passe
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            req.body.password = hash;

            const createUser = "INSERT INTO user SET ?;";
            // const findUserExists = `SELECT * FROM user WHERE username = '${req.body.username}' OR email = '${req.body.email}';`;
            const findUserName = `SELECT username FROM user WHERE username = '${req.body.username}';`;
            const findEmail = `SELECT email FROM user WHERE email = '${req.body.email}';`;

            db.query(findUserName, (err, result) => {
                if (result.length) {
                    return res.status(400).json({ err: "Nom d'utilisateur déjà existant" });
                } else {
                    db.query(findEmail, (err, result) => {
                        if (result.length) {
                            return res.status(400).json({ err: "Email déjà existant" });
                        } else {
                            db.query(createUser, req.body, (err, result) => {
                                if (err) {
                                    console.log(err)
                                    return res.status(400).json({ err: err.sqlMessage });
                                }
                                res.status(201).json({ message: "Compte créé !" });
                            })
                        }
                    })
                }
            });
        })
        .catch(error => res.status(500).json({ error }));
};


// Connexion utilisateur 
exports.login = (req, res, next) => {
    const findUser = `SELECT * FROM user WHERE email = '${req.body.email}';`;

    db.query(findUser, (err, result) => {
        if (!result.length) {
            console.log("Email incorrect !");
            return res.status(401).json({ error: "Email incorrect !" });
        }
        bcrypt.compare(req.body.password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'MDP incorrect !' });
                }
                res.status(200).json({
                    userId: result[0].id,
                    token: jwt.sign(
                        { userId: result[0].id },
                        'TOKEN_SECRET',
                        { expiresIn: '24h' }
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
