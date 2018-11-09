const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    hash_password: {
        type: String,
        require: true
    },
    avatar: String,
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

module.exports = User = mongoose.model("users", userSchema);