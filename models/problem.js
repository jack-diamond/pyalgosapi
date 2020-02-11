const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    name: String,
    problems: [{
        name: String,
        link: String
    }]
})

module.exports = mongoose.model('Problem', problemSchema);