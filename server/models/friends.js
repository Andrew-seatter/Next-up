/*
friends needs
an id of the relationship number
a user from the user schema
*/

const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const friendSchema = new Schema({
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
});

const Friend = model('Friend', friendSchema);

module.exports = Friend;