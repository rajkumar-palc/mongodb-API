const mongoose = require('mongoose');
// const { route } = require('../routes');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number,
    },
    type: {
        required: true,
        type: String,
    },
    position: {
        required: true,
        type: String,
    },
    sourcePosition: {
        required: true,
        type: String,
    },
    targetPosition: {
        required: true,
        type: String,
    },
    data: { 
        label: {
            required: true,
            type: String,
        }
    }

});

module.exports = mongoose.model('node', dataSchema);