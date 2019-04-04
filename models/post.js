const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        text: String,
        created: {
            type: Date,
            default: Date.now
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    created:{
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("Post",postSchema)