module.exports = (req, res) => {
    //res.render('weather')
    let query ="SELECT * FROM users ORDER BY id ASC"
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('homepage.ejs', {
             
                users : result
            });
        });
}