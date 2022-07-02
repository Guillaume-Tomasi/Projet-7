const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASS,
    database: 'groupomania'
});

db.connect((err) => {
    if (err) {
        console.log("Connexion à la base de données échouée !");
        return;
    }
    console.log("Connexion à la base de données réussie !");
});
module.exports = db;