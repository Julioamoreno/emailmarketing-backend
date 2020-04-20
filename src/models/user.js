let mongoose = require('mongoose');

let User = mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accounts: [{
        name: String,
        role: String,
        enabled: Boolean
    }]
});

module.exports = mongoose.model('User', User);