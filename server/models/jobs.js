/*
jobs needs
id
name
date
stars
status
followUp boolean
contact
note
likes
*/

//status will be a string designated by update events on front end
// changed to contactName and companyName to match line up with front end
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const jobSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  jobTitle: {
    type: String,
    required: 'Your job has to have a title!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  appUrl: String,
  status: {
    type: String,
    enum: [
      'interviewed',
      'rejected',
      'hired',
      'applied'
    ],
    required: true,
    default: 'applied'
  },
  companyName: {
    type: String,
    required: 'Your job has to have a company!',
    minlength: 1,
    maxlength: 45,
    trim: true,
  },
  contactName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 40
},
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  stars: {
    type: Number,
    required: 'Your job has to have a certain number of stars'
  },
  followUp: {
    type: Boolean
  },
  note: {
    type: String,
    minlength: 1,
    maxlength: 400,
    trim: true
  },
  companyIcon: {
    type: String,
    minlength: 1,
    maxlength: 500,
    trim: true,
  },
  
  likes: [
    {
      likeAuthor: {
        type: String,
        required: true,
      },
      like: {
        type: Boolean,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Jobs = model('Jobs', jobSchema);

module.exports = Jobs;


