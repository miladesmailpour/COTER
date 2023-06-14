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

newtweet.hasMany(Comment, {
    foreignKey: 'newtweet_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(newtweet, {
    foreignKey: 'newtweet_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, newtweet, Comment };