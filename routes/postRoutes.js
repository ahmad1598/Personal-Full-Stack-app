const express = require('express')
const postRouter = express.Router()
const Post = require('../models/post.js')


//CREATE A NEW POST
postRouter.post('/' , (req, res, next) => {
    const newPost = new Post(req.body)
    // newPost.postedBy = req.body.postedBy
    newPost.user = req.user._id
    newPost.save((err, newPost) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newPost)
    })
})


//GET ALL POSTS for specific user
postRouter.get('/' , (req,res,next) => {
    Post.find({user: req.user._id} , (err,userPosts) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(userPosts)
    })
})

//GET ONE POST PER USER


//DELETE A POST
postRouter.delete('/:_id', (req, res) => {
    Post.findOneAndDelete({_id: req.params._id} , (err,deletedPost) => {
        if(err){
            res.status(500)
            return res.send(err)
        }
        return res.status(202).send(`Successfully deleted`)
    })
})


//UPDATE A POST
postRouter.put('/:_id', (req, res, next) => {
    Post.findOneAndUpdate({_id: req.params._id} , req.body , { new: true }, (err, updatedPost) => {
        if(err){
            res.status(500)
            return next(err)
        }

        return res.status(201).send(updatedPost)
    })
})


//Increment likes
postRouter.put('/like/:_id', (req,res,next) => {
    Post.findOneAndUpdate({_id:req.params._id},req.body , {new: true} , (err, updatedPost) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedPost)
    })
})

//Increment likes
postRouter.put('/dislike/:_id', (req,res,next) => {
    Post.findOneAndUpdate({_id:req.params._id},req.body , {new: true} , (err, updatedPost) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedPost)
    })
})
// postRouter.put('/dislike/:_id', (req,res,next) => {
//     Post.findOneAndUpdate({_id:req.params._id},{$inc:{dislike: -1}} , {new: true} , (err, updatedPost) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(201).send(updatedPost)
//     })
// })

//CREATE A NEW COMMENT
// postRouter.post('/comments/:_id' , (req, res, next) => {
//     Post.findOneAndUpdate({_id:req.params._id},{$push:{}})
// })



module.exports = postRouter

