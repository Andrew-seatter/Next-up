const { User, Goals, Jobs, Friend, FriendRequest } = require("../models");
const { signToken, AuthenticationError, UserNotFoundError, WrongPasswordError, CreateAlreadyTakenError, ShortPasswordError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("jobs");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
    },
    jobs: async (parent, { user_id }) => {
      const jobs = await Jobs.find({ user_id }).sort({ createdAt: -1 });
      return jobs;
    },
    job: async (parent, { jobId }) => {
      return Jobs.findOne({ _id: jobId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("jobs");
      }
      throw AuthenticationError;
    },

    // Get data for applications over time Line Chart
    applicationsOverTime: async () => {
      const result = await Jobs.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            count: 1
          }
        },
        { $sort: { date: 1 } } // Sort by date in ascending order
      ]);

      return result.map(item => ({
        date: item.date,
        count: item.count
      }));
    },

    // Get data for job status Pie Chart
    jobStatusCounts: async () => {
      const statuses = await Jobs.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $project: { _id: 0, status: "$_id", count: 1 } }
      ]);
  
      return statuses;
    },

    // Get data for salary distribution Scatter Chart
    salaryData: async () => {
      return Jobs.find({}, 'salaryRangeLow salaryRangeHigh');
    },

    // Get data for applications vs interviews Bar Chart
    interviewsVsApplications: async () => {
      const totalApplications = await Jobs.countDocuments();
      const totalInterviews = await Jobs.countDocuments({ status: 'interviewed' });

      return [{ 
        applications: totalApplications, 
        interviews: totalInterviews 
      }];
  },
},

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log("Error creating user")
        console.log(error)
        console.log("CODE:", error.code)
        console.log("MESSAGE:", error.message)
        if (error.code === 11000) {
          if (error.keyPattern.username) {
            throw CreateAlreadyTakenError('username')
          } else if (error.keyPattern.email) {
            throw CreateAlreadyTakenError('email')
          }
        } else {
          if (error.message.includes('is shorter than')) {
            throw ShortPasswordError
          }
        } 
        throw AuthenticationError
      }
    },
    login: async (parent, { email, password }) => {
      console.log("ATTEMPTING to log in:", email)
      const user = await User.findOne({ email });

      if (!user) {
        throw UserNotFoundError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw WrongPasswordError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addJob: async (parent, { input }, context) => {
      try {
        const job = await Jobs.create(input);

        await User.findOneAndUpdate(
          { _id: input.user_id },
          { $addToSet: { jobs: job._id } }
        );

        return job;
      } catch (error) {
        console.log("Error adding job!");
        console.log(error);
      }
      // throw AuthenticationError;
      // ('You need to be logged in!');
    },

    updateJob: async (parent, { jobId, input }, context) => {
      console.log("updating job...");
      let updatedJob
      try {
        updatedJob = await Jobs.findByIdAndUpdate(jobId, input, {
          new: true,
        });
      } catch (updatedError) {
        console.log("Error updating job");
        console.log(updatedError);
        throw AuthenticationError;
      }
      if (!updatedJob) {
        console.log("Job not found")
        throw new Error("Error saving Job");
      }
      if (updatedJob.user_id) {
        try {
          await User.findOneAndUpdate(
            { _id: updatedJob.user_id },
            { $addToSet: { jobs: jobId } }
          );
          return updatedJob;
        } catch (err) {
          console.log("Error updating job");
          console.log(updatedError);
        }
      }
    },

    addLike: async (parent, { jobId, like }, context) => {
      if (context.user) {
        return Jobs.findOneAndUpdate(
          { _id: jobId },
          {
            $addToSet: {
              likes: { like, likeAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeJob: async (parent, { jobId, userId }, context) => {
      const job = await Jobs.findOneAndDelete({
        _id: jobId,
        // jobAuthor: context.user.username,
      });

      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { jobs: job._id } }
      );

      return job;
      throw AuthenticationError;
    },
    removeLike: async (parent, { jobId, likeId }, context) => {
      if (context.user) {
        return Jobs.findOneAndUpdate(
          { _id: jobId },
          {
            $pull: {
              likes: {
                _id: likeId,
                likeAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
