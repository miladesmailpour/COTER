const sequelize = require('../config/connection');
const { User, Tweet, Comment } = require('../models');
const userData = require('./userData.json');
const tweetData = require('./tweetData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    for (const tweet of tweetData) {
        await Tweet.create({
            ...tweet,
            user_id: users[Math.floor(Math.random() * User.lemgth)].id,
        });
    }
    process.getMaxListeners(0);
};
seedDatabase();