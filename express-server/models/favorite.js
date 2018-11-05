const mongoose = require('mongoose');
const favSchema = mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    feed_id: {
        type: Schema.Types.ObjectId,
        ref: 'Feed'
    }
})

module.exports = mongoose.model('Fav',favSchema);