const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref:'users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: String,
    likes: {
        type: Number,
        default: 0
    },
    favorites: {
        type: Boolean,
        default: false
    },
    tag: {
        type: [String],
        required: true
    },
    text: {
        type: String,
        required: true,
        default: "This is a new post"
    },
    imgs: {
        type: [String]
    },
    music: Object,
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = Feed = mongoose.model('feeds',feedSchema);