module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes?', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notesbyid?', notes.findOne);

    // Update a Note with noteId
    app.post('/notesupbyid', notes.update);

    // Delete a Note with noteId
    app.get('/notesdelbyid?', notes.delete);

    // File Upload in 

    app.post('/uploadfile', notes.uploadfile);

    app.post('/sendemail', notes.sendemail);
    

}