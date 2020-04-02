const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const Caimpaign = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: String,
    status: String,
    start: { type: Date, required: true },
    opens: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    unsubscribe: { type: Number, default: 0 },
    bounces: { type: Number, default: 0 },
    lists: [
        {
            title: String,
            type: ObjectId,
            ref: 'List'
        }
    ],
});

module.exports = mongoose.model('Caimpaign', Caimpaign);