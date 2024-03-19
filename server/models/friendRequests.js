const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const friendRequestsSchema = new Schema({
    friend: [
        {
            type: Schema.Types.ObjectId,
             ref: 'User',
         }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    status: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 40
        },
 });

 const FriendRequest = model('FriendRequest', friendRequestsSchema);

module.exports = FriendRequest;