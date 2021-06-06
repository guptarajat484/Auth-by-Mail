const express = require('express')
const user = require('./routes/userRouter')

const app = express()



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', user)
app.listen(8989, function () {
    console.log("Server is Running on Port 8989")
})