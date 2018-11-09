const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        default: "Nobody"
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    motto: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    hash_password: {
        type: String,
        require: true
    },
    hobbies: [String],
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema);