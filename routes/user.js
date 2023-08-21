const express = require("express")
const { userModel } = require("../models/user")
var cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter = express.Router()
//..........Registation.............
userRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.send({ "msg": "something went wrong", "error": err.message })
            } else {
                const user = new userModel({ name, email, password: hash })
                await user.save()
                res.send({ "msg": "New user has been registered" })
            }
        });
    } catch (error) {
        res.send({ "msg": "something went wrong", "error": error.message })
    }
})


//...........Login................
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    var token = jwt.sign({ userID: user[0]._id }, 'masai', { expiresIn: '1h' });
                    console.log(token)
                   
                    //.....store token in cookies.......
                    res.cookie('token', token);
                   
                    //........................................................
                    res.send({
                        "msg": "Login successful", "token": token
                       
                    })
                } else {
                    res.send("wrong credentials")
                }
            });
        } else {
            res.send("wrong credentials")
        }
    } catch (error) {
        res.send({ "msg": "something went wrong", "error": error.message })
    }
})


module.exports={userRouter}

    