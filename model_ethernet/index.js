const mongoose = require('mongoose');
// const { route } = require('../routes');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number,
    },
    name: {
        required: true,
        type: String,
    },
    usage: {
        required: true,
        type: String,
    }
});

module.exports = mongoose.model('ethernet', dataSchema);