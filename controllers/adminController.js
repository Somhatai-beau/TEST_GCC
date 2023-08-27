module.exports = (req, res) => {
    //res.render('admin')//res.render('weather')
    let query ="SELECT * FROM users ORDER BY id ASC"
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('admin.ejs', {
             
                users : result
            });
        });
}