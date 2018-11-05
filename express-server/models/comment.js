const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    feed_id: {
        type: Schema.Types.ObjectId,
        ref: 'Feed'
    },
    content: String,
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema);