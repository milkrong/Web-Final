const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    feed_id: {
        type: Schema.Types.ObjectId,
        ref: 'feeds'
    },
    content: String,
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = Comment = mongoose.model('comments', commentSchema);