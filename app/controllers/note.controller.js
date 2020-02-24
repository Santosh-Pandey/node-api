const Note = require('../models/note.model.js');
const myfileupload = require('../../utill/fileUpload.utill.js');
var nodemailer = require('nodemailer');


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    //console.log(req.body.other_info);

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note", 
        content: req.body.content,
        author_first_name: req.body.author_first_name,
        author_last_name: req.body.author_last_name,
        author_contact: req.body.author_contact,
        other_info :{
                    country: req.body.other_info.country,
                    language: req.body.other_info.language,
                    description: req.body.other_info.description
                    }
    });

    // Save Note in the database
    note.save()
    .then(data => {
        result = {};
        result.message = 'Record successfully created';
        result.error = 0;
        result.data = data;
        res.send(JSON.stringify(result));

    }).catch(err => {
        res.status(500).send({
            error : 1,
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};




// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    //console.log('hiiiiii');
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var query = {};

    query.skip = size * (pageNo - 1)
    query.limit = size

    /*Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });*/

     // Find some documents
       Note.countDocuments({},function(err,totalCount) {
             if(err) {
               response = {"error" : true,"message" : "Error fetching data"}
             }
         Note.find({},{},query,function(err,data) {
              // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                var totalPages = Math.ceil(totalCount / size)
                response = {"error" : 111111,"message" : data,"pages": totalPages};
            }
            //res.json(response);
            res.json(response);
         })
         .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
    });



       })
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.query.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.query.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.query.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.query.noteId
        });
    });
};



// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.body.id, {
        title: req.body.title || "Untitled Note",
        content: req.body.content

    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.query.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.query.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.query.noteId
        });
    });
};




// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.query.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.query.noteId
            });
        }
        //res.send({message: "Note deleted successfully!"});
        res.json({message: "Note deleted successfully!"});

    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.query.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.query.noteId
        });
    });
};

//fileupload

exports.uploadfile = (req, res) => {
   try {
        
        const image = req.files.myFile
        const result = myfileupload.uploadfile(image);

       //Anonymious function does not return direct value so we use callback
        myfileupload.uploadfile(image, function(err,result){
            console.log(result);
            if(result === true){
                res.json({message: "file successfully uploaded",status:"1"})
            }else{
                res.status(500).send({message: "Error On uploading files",status:"0"});
            }
        });



    } catch (err) {
        res.status(500).send(err);
    }
};


exports.sendemail = (req, res) => {
   try {
        

        let transporter = nodemailer.createTransport({
          host: 'smtp.googlemail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'software@cg-infotech.com',
              pass: 'CG!L1234!@#$'
          }
        });

        let mailOptions = {
              from: '<software@cg-infotech.com>', // sender address
              to: req.body.to, // list of receivers
              subject: req.body.subject, // Subject line
              text: req.body.body, // plain text body
              html: '<b>req.body.body</b>' // html body
        };


        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
              return res.status(500).send({
                        message: error
                    });
          }
          

          //console.log('Message %s sent: %s', info.messageId, info.response);
          res.json({message: 'Message %s sent: %s' + info.messageId + '|' + info.response});    

        });
      
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};