const sequelize = require('../config/connection');
const { User, Tweet, Comment } = require('../models');
const userData = require('./userData.json');
const tweetData = require('./tweetData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    for (const tweet of tweetData) {
        await Tweet.create({
            ...tweet,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
        const tweets = await Tweet.bulkCreate(tweetData, {
            individualHooks: true,
            returning: true,
        }) ///question

        for (const comment of commentData) {
            await Comment.create({
                ...comment
            });
        };
        process.getMaxListeners(0);
    }
};
seedDatabase();
