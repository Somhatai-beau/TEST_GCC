module.exports = {
    getHomePage: (req, res) => {
        let query ="SELECT * FROM users ORDER BY id ASC"

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            res.render('index.ejs', {
                title: "Welcome to Socka | View Users",
                users: result
            });
        });
    }
}


/*const express = require("express");

const router = express.Router();

const homeController = require('../controllers/home.controller');

router.get('/', homeController.getHomePage);

module.exports = router;*/