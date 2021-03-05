const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on('connected', function(){
    console.log(`Connected to mongoDB at ${db.host}:${db.port}`)
});