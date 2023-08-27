const fs = require('fs');
module.exports = {
    getTicket: (req, res) => {
        let query ="SELECT * FROM ticket ORDER BY id ASC"

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            res.render('ticket.ejs', {
             
                ticket: result
            });
        });
        
    },
    
    addTicketPage: (req, res) => {
        res.render('add-ticket.ejs', {
            title: "Welcome to Socka | Add a new Ticket",
            message: ''
        });
    },
    
    addTicket: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }
    
        let message = '';
        let topic = req.body.topic;
        let name = req.body.name;
        let institution = req.body.institution;
        let oprator = req.body.oprator;
        let om_rm = req.body.om_rm;
        let responsible = req.body.responsible;
        let status = req.body.status;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name =name + '.' + fileExtension;

       // let usernameQuery = "SELECT * FROM `ticket`";
        let usernameQuery = "SELECT * FROM `ticket` WHERE topic = '" + topic + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Topic already exists';
                res.render('add-ticket.ejs', {
                    message,
                    //title: "Welcome to Socka | Add a new user"
                });
            } else {
            
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the player's details to the database
                        let query = "INSERT INTO `ticket` (topic, name, institution, oprator, om_rm, responsible, status, image) VALUES ('" +
                        topic + "', '" + name + "', '" + institution + "', '" + oprator + "', '" + om_rm + "', '" + responsible + "', '" + status + "', '" + image_name + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/ticket');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-ticket.ejs', {
                        message,
                       // title: "Welcome to Socka | Add a new user"
                    });
                }
            }
            
        });       
    },
    
    editTicketPage: (req, res) => {
        let ticketId = req.params.id;
        let query = "SELECT * FROM `ticket` WHERE id = '" + ticketId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-ticket.ejs', {
                title: "Edit ticket",
                ticket: result[0],
                message: ''
            });
        });
    },
    
    editTicket: (req, res) => {
        let ticketId = req.params.id;
        let topic = req.body.topic;
        let name = req.body.name;
        let institution = req.body.institution;
        let oprator = req.body.oprator;
        let om_rm = req.body.om_rm;
        let responsible = req.body.responsible;
        let status = req.body.status;
    
        let query = "UPDATE `ticket` SET `topic` = '" + topic + "', `name` = '" + name + "', `responsible` = '" + responsible + "', `institution` = '" + institution + "', `om_rm` = '" + om_rm + "', `oprator` = '" + oprator + "', `status` = '" + status + "' WHERE `ticket`.`id` = '" + ticketId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/ticket');
        });
    },
    deleteTicket: (req, res) => {
        let userId = req.params.id;
        let getImageQuery = 'SELECT image from `ticket` WHERE id = "' + ticketId + '"';
        let deleteUserQuery = 'DELETE FROM ticket WHERE id = "' + ticketId + '"';
    
        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
    
            let image = result[0].image;
    
            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/ticket');
                });
            });
        });
    }
    
}