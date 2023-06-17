const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tweet extends Model { }

Tweet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        cote: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },          
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'tweet'
    }
);

module.exports = Tweet;