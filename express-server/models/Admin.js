const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = Admin = mongoose.model("admins", adminSchema);