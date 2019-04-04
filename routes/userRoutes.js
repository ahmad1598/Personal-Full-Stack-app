const express = require('express')
const userRouter = express.Router()
const User = require('../models/user.js')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')
// const profileImage = require('./../client/src/img/default.png')
// import _ from 'lodash'

userRouter.get('/photo/:userId', (req,res,next) => {
    if(req.profile.photo.data){
        res.set("Content-type", req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }
    next()
}) 
// userRouter.get('/defaultphoto',(req,res) => {
//     return res.sendFile(process.cwd()+profileImage)
// })

//Get All user
//only if the user logged in
userRouter.get('/', (req, res) => {
    User.find((err, users) => {
        // Always handle DB errors first
        if (err) {
            res.status(500)
            return res.send(err)
        }
        // Send back response
        return res.status(200).send(users)
    })
})

userRouter.put('/following' , (req,res,next) => {
    User.findByIdAndUpdate(req.body.userId,{$push:{following:req.body.followId}} , (err, result) => {
        if(err){
            res.status(500)
            return next(err)
        }
    })
})

userRouter.put('/follower', (req,res,next) => {
    User.findByIdAndUpdate(req.body.followId , {$push:{followers: req.body.userId}},{new:true})
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, result) => {
    if (err) {
       res.status(500)
        return next(err) 
    }
    // result.hashed_password = undefined
    // result.salt = undefined
    // res.json(result)
  })
})

//CREATE A NEW USER
userRouter.post('/', (req,res,next) => {
    const newUser = new User(req.body)
    newUser.save((err, newSavedUser) => {
        if(err){
            res.status(500)
            return next(err)  
        }
        return res.status(201).send(newSavedUser) 
    })
})

//GET ALL USER
userRouter.get('/', (req,res) => {
    User.find((err, users) => {
        if(err){
            res.status(500)
            return res.send(err)
        }
        return res.status(200).send(users)
    })
})

//GET ONE USER
userRouter.get(':/_id', (req,res) => {
    User.findOne({_id: req.params._id} , (err, foundUser) => {
        if(err){
            res.status(500)
            return res.send(err)
        }
        return res.status(200).send(foundUser)
    })
})


//DELETE A USER
userRouter.delete('/:_id' , (req, res) => {
    User.findOneAndDelete({_id: req.params._id} , (err, deletedUser) => {
        if(err){
            res.status(500)
            return res.send(err)
        }
        return res.status(202).send(`Successfully deleted User with ID ${req.params._id}`)
    })
})

//UPDATE
userRouter.put(':/_id', (req,res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files) => {
        if(err){
            return res.status(400).json({
                error:'Photo could not be uploaded'
            })
        }
        let user = req.profile
        user = _.extend(user,fields)
        user.updated = Date.now()
        if(files.photo){
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType = files.photo.type
        }
        user.save((err, result) => {
            if(err){
                res.status(500)
                return res.send(err)
            }
            res.json(user)
        })
    })
})



module.exports = userRouter