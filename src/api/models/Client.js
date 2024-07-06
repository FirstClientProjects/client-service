const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);