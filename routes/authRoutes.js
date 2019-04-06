const express = require('express')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

//POST A NEW USER - SIGN UP 
authRouter.post('/signup' , (req,res,next) => {
    User.findOne({username: req.body.username.toLowerCase()} , (err, existingUser) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        if(existingUser){
            res.status(400)
            return next(new Error("That username already exists!"))
        }

        const newUser = new User (req.body)
        newUser.save((err,user) => {
            if(err){
                res.status(500)
                return next(err)
            }

            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(201).send({user: user.withoutPassword(), token})
        })
    })
})

authRouter.post("/login", (req,res,next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err) return res.status(500).send(err)
        if(!user){
            res.status(403)
            return next(new Error("Username or password are incorrect"))
        }
        user.checkPassword(req.body.password, (err, match) => {
            if(err) return res.status(500).send(err)
            if(!match){
                res.status(401)
                return next(new Error("Username or password are incorrect"))
            }
            
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({token: token, user: user.withoutPassword(), success: true})
        })
    })
})


module.exports = authRouter

