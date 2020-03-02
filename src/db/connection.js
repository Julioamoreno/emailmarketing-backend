let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/email_marketing', {
    useNewUrlParser: true,    
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch(err => {
    console.log('Mongoose error ', err);
});

module.exports = mongoose;