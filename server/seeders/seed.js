const db = require('../config/connection');
const { User, Jobs, Goals, Friend, FriendRequest } = require('../models');
const userSeeds = require('./userSeeds.json');
const jobSeeds = require('./jobSeeds.json');
const cleanDB = require('./cleanDb');

db.once('open', async () => {
  try {
    await cleanDB('Jobs', 'jobs');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < jobSeeds.length; i++) {
      const { _id, jobAuthor } = await Jobs.create(jobSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: jobAuthor },
        {
          $addToSet: {
            jobs: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
