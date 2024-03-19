/* 
goals needs
text
term string
*/
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const goalSchema = new Schema({
    goalText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 400,
        trim: true,
    },
    goalStatus: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 40,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }
});

const Goals = model('Goals', goalSchema);


module.exports = Goals;