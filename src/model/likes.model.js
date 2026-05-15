const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    required: [true, "Post id is required for adding like"]
    },
    user: {
        type: String,
        required: [true, "Username is required for adding a like"]
    }
},{
    timestamps: true
})

likesSchema.index({post: 1, user: 1}, {unique: true})


const likesModel = mongoose.model('likes', likesSchema)

module.exports = likesModel