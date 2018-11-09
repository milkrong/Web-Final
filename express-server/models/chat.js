const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    send_to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = Chat = mongoose.model('chats', chatSchema);