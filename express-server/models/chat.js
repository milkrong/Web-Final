const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    friend_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String
})

module.exports = Chat = mongoose.model('chats', chatSchema);