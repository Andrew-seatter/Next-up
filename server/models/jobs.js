
//status will be a string designated by update events on front end

const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const jobSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  jobTitle: {
    type: String,
    required: "Your job has to have a title!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  appUrl: String,
  status: {
    type: String,
    enum: [
      "interviewed",
      "rejected",
      "hired",
      "applied",
      "pending",
      "follow-up",
    ],
    required: true,
    default: "applied",
  },
  companyName: {
    type: String,
    required: "Your job has to have a company!",
    minlength: 1,
    maxlength: 45,
    trim: true,
  },
  contactName: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 40,
  },
  contactInfo: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 40,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    // get: (timestamp) => dateFormat(timestamp),
    set: (value) => {
      const date = new Date(value);
      return isNaN(date.getTime()) ? undefined : date;
    },
  },
  dateString: {
    type: String,
  },
  stars: {
    type: Number,
    required: "Your job has to have a certain number of stars",
  },
  followUp: {
    type: Boolean,
  },
  note: {
    type: String,
    minlength: 0,
    maxlength: 400,
    trim: true,
  },
  companyIcon: {
    type: String,
    trim: true,
  },
  salaryRangeLow: {
    type: Number,
    min: 0,
  },
  salaryRangeHigh: {
    type: Number,
    max: 500_000,
  },
  desiredSalary: {
    type: Number,
    min: 0,
    max: 500_000,
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

const Jobs = model("Jobs", jobSchema);

module.exports = Jobs;
