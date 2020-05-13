let mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_URL}`, {
    useNewUrlParser: true,    
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch(err => {
    console.log('Mongoose connection error ', err);
});

module.exports = mongoose;