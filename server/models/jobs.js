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
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    required: 'Your job has to have a title!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  jobCompany: {
    type: String,
    required: 'Your job has to have a company!',
    minlength: 1,
    maxlength: 45,
    trim: true,
  },
  jobAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  stars: {
    type: Number,
  },
  followUp: {
    type: Boolean
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


