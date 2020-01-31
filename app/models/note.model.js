const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    author_first_name: String,
    author_last_name: String,
    author_contact: Number,
    other_info: {
        country: String,
        language: String,
        description: String
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);