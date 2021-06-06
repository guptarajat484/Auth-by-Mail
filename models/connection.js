const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/verify', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })
    .then(res => {
        console.log("Database Connected")
    }).catch(err => {
        console.log("Err In Database Connection " + err)
    })

module.exports = mongoose;

