
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
module.exports = (req, res) => {
    let query ="SELECT * FROM users ORDER BY id ASC"
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('topbar.ejs', {
             
                user : result
            });
        });
}