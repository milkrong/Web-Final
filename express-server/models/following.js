const mongoose = require('mongoose');
const followingSchema = mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    following_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = Following = mongoose.model('followings', followingSchema);