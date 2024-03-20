const db = require('../config/connection');
const { User, Jobs, Goals, Friend, FriendRequest } = require('../models');
const userSeeds = require('./userSeeds.json');
const jobSeeds = require('./jobSeeds.json');
const cleanDB = require('./cleanDb');

db.once('open', async () => {
    try {
      await cleanDB('Jobs', 'jobs');
  
      for (let i = 0; i < jobSeeds.length; i++) {
        const { _id, user_id } = await Jobs.create(jobSeeds[i]);
        const user = await User.findOneAndUpdate(
          { _id: user_id },
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