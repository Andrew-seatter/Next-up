const { User, Goals, Jobs, Friend, FriendRequest } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('jobs');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    jobs: async (parent, { user_id }) => {
      const jobs = await Jobs.find({user_id})
        .sort({ createdAt: -1 });
      return jobs
    },
    job: async (parent, { jobId }) => {
      return Jobs.findOne({ _id: jobId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('jobs');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
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
        console.log("Error adding job!")
        console.log(error)
      }
      // throw AuthenticationError;
      // ('You need to be logged in!');
    },

    updateJob: async (parent, {jobId, input}, context) => {
      console.log("updating job...")
      try {
          const updatedJob = await Jobs.findByIdAndUpdate(jobId, input, {new:true});

        } catch (updatedError) {
          console.log("Error updating job")
          console.log(updatedError)
          throw AuthenticationError
        } 
        if (!updatedJob) {
          throw new Error ("Error saving Job");
        } 
        if (updatedJob.user_id) {
          try {
            await User.findOneAndUpdate(
              {_id: updatedJob.user_id},
              {$addToSet: {jobs: jobId}}
            )
            return updatedJob;
          } catch (err) {
            console.log("Error updating job")
            console.log(updatedError)
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
    removeJob: async (parent, { jobId }, context) => {
      if (context.user) {
        const job = await Jobs.findOneAndDelete({
          _id: jobId,
          jobAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { jobs: job._id } }
        );

        return job;
      }
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
