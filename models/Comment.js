const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Comment extends Model { }
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        validate: {

            len: [100]
        }
    },
    tweet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tweet',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
});
module.exports = Comment;