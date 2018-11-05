const mongoose = require('mongoose');
const feedSchema = mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    likes: Number,
    favorites: Boolean,
    feed_type: {
        type: String,
        required: true
    },
    content: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Feed',feedSchema);