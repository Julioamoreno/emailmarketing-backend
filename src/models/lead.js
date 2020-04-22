const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const Lead = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    data: [
        {
            label: String,
            value: String,
        }
    ],
    lists: [
        {
            type: ObjectId,
            ref: 'List'
        }
    ],
    actions: [
        {
            type: ObjectId,
            ref: 'List',
            action: [
                {
                    type: String,
                    link: String,
                    date: Date,
                }
            ]
        }
    ],
    
});

module.exports = mongoose.model('Lead', Lead);