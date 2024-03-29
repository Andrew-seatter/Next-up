const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const dateFormat = require("../utils/dateFormat");
const Job = require("./jobs.js");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  jobs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Jobs",
    },
  ],
  goals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Goals",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "Friend",
    },
  ],
  friendRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "FriendRequest",
    },
  ],
  jobsThisWeek: {
    type: Number,
    get: async function () {
      const jobs = this.jobs;
      let n = 0;
      let now = new Date();
      for (let i = 0; i < jobs.length; i++) {
        const j = await Job.findById(jobs[i]);
        let jobDate = new Date(j.createdAt);
        if (jobDate - now < 7 * 24 * 60 * 60 * 1000) {
          n++;
        }
      }
      return n;
    },
  },
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.salaryRangeLow > this.salaryRangeHigh) {
    throw new Error("salaryRangeHigh must be higher than salaryRangeLow");
  }

  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
