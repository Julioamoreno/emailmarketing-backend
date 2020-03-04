let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,    
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch(err => {
    console.log('Mongoose error ', err);
});

module.exports = mongoose;