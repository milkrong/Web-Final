const mongoose = require('mongoose');

const followerSchema = mongoose.Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    follower_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Follower',followerSchema);