const express = require('express')
const userRouter = express.Router()
const User = require('../models/user.js')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const multer = require('multer')
// import _ from 'lodash'

const router = express.Router()


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

userRouter.put('/follow' , async (req,res,next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.user._id,{$push:{following:req.body.followId}})
        const updateFollower = await User.findByIdAndUpdate(req.body.followId,{$push:{followers:req.user._id}})
        return res.status(201).send({updatedUser,updateFollower})

    }
    catch(err){
        res.status(500)
        return next(err)
    }
})

userRouter.put('/unfollow' , async (req,res,next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.user._id,{$pull:{following:req.body.followId}})
        const updateFollower = await User.findByIdAndUpdate(req.body.followId,{$pull:{followers:req.user._id}})
        return res.status(201).send({updatedUser,updateFollower})

    }
    catch(err){
        res.status(500)
        return next(err)
    }
})

userRouter.get('/following',async (req,res,next) => {
    try{
        const user = await User.findOne({_id: req.user._id})
        const users = await User.find({_id: {$in: user.following}})
        return res.status(200).send(users)
    }catch(err){
        res.status(500)
        return next(err)

    }
})

userRouter.get('/followers',async (req,res,next) => {
    try{
        const user = await User.findOne({_id: req.user._id})
        const users = await User.find({_id: {$in: user.followers}})
        return res.status(200).send(users)
    }catch(err){
        res.status(500)
        return next(err)

    }
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
userRouter.get('/:_id', (req,res) => {
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

//UPDATE A USER
userRouter.put('/', (req, res, next) => {
    User.findOneAndUpdate({_id: req.user._id}, req.body, {new: true}, (err, updatedUser) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedUser)
    })
})

// userRouter.put('/:_id', (req, res, next) => {
//     User.findOneAndUpdate({_id: req.params._id} , req.body , { new: true }, (err, updatedUser) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(201).send(updatedUser)
//     })
// })

//return res.status(200).send({token: token, user: user.withoutPassword(), success: true})

//UPDATE
// userRouter.put(':/_id', (req,res, next) => {
//     let form = new formidable.IncomingForm()
//     form.keepExtensions = true
//     form.parse(req, (err,fields,files) => {
//         if(err){
//             return res.status(400).json({
//                 error:'Photo could not be uploaded'
//             })
//         }
//         let user = req.profile
//         user = _.extend(user,fields)
//         user.updated = Date.now()
//         if(files.photo){
//             user.photo.data = fs.readFileSync(files.photo.path)
//             user.photo.contentType = files.photo.type
//         }
//         user.save((err, result) => {
//             if(err){
//                 return res.status(400).json({
//                     error: 'something went wrong'
//                   })
//             }
//             res.json(user)
//         })
//     })
// })


userRouter.get('/photo/:userId', (req,res,next) => {
    User.findOne({_id: req.body._id} , (err, foundUser) => {
        if (err) {
            res.status(500)
            return res.send(err)
        }
        return res.status(200).send(foundUser)
    })
}) 



module.exports = userRouter