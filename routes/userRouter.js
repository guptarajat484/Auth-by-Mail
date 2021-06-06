const express = require('express')
const routes = express.Router()
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const User = require('../models/user')

routes.post('/signup', async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.send("Please Enter Required Fields")
    }
    const user = await User.findOne({ email })
    if (user) {
        return res.send("User is Already Exist");
    }

    const uu = new User({
        name, email, password

    })

    const token = jwt.sign({ name, email, password }, "this is secret key for email verification", { expiresIn: '20m' })
    const verifyurl = `http://localhost:8989/email-verify${token}`;

    let nodeTransporte = nodemailer.createTransport({

        service: 'gmail',
        secure: false,
        auth: {
            user: 'gupta.rajat484@gmail.com',
            pass: ''
        }

    });

    let mailDetails = {
        from: 'gupta.rajat484@gmail.com',
        to: 'gupta.rajat484@gmail.com',
        subject: "Verification Mail",
        html: `<a href="${verifyurl}">Click Here to verify </a>`,

    }
    nodeTransporte.sendMail(mailDetails, function (err, data) {
        if (err)
            console.log(err)
        else {
            return res.send("Mail Send Successfully" + token)
        }
    })

});

routes.get('/email-verify:url', (req, res) => {
    const token = req.params.url;

    jwt.verify(token, "this is secret key for email verification", function (err, decode) {
        if (err) {
            return res.send(err)
        }
        const { name, email, password } = decode
        User.findOne({ email }).exec((err, user) => {
            if (user) {
                return res.send("User Is Already Register")
            }
        })
        const salt = bcrypt.genSaltSync(16);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = new User({
            name: name, email: email, password: hash
        })
        newUser.save((err, succ) => {
            if (err) {
                throw err
            }
            return res.send("Register Successful")
        })
    })
})

module.exports = routes;



