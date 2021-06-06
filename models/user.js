const con = require('./connection');
const mongoose = require('mongoose')

const user = new con.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified:
    {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Us = con.model('Us', user)
module.exports = Us;

