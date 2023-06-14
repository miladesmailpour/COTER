const User = require('./User');
const newtweet = require('./Newtweet');
const Comment = require('./Comments');

User.hasMany(newtweet, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

newtweet.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Blog };
