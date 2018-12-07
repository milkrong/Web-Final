const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String, 
        required: true,
        default: "Unknown"
    },
    username: {
        type: String,
        required: true,
        default: 'Unknown'
    },
    motto: {
        type: String,
        required: true,
        default: "To be or not to be, I am the best"
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    hash_password: {
        type: String,
        require: true
    },
    avatar: String,
    landing_img: String,
    hobbies: [String],
    following_number:{
        type: Number,
        default: 0
    },
    follower_number :{
        type: Number,
        default: 0
    },
    feeds_number: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model("users", userSchema);