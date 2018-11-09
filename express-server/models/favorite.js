const mongoose = require('mongoose');
const favSchema = mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    feed_id: {
        type: Schema.Types.ObjectId,
        ref: 'feeds'
    }
})

module.exports = Fav = mongoose.model('favs',favSchema);