const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define(
  'users',
  {
    username: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    totalScore: {
      type: Sequelize.INTEGER,
    },
    rank: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: 'users',
  }
);

module.exports = User;

// Room.hasMany(User);
// User.belongsTo(Room);

// Room.belongsToMany(User, {
//     as: 'Player',
//     through: userRelation,
//     foreignKey: 'Player_id',
//     onDelete: 'cascade',
//     hooks: true
// });
// User.belongsToMany(Room, {
//     as: 'Player',
//     through: userRelation,
//     foreignKey: 'Player_id',
//     onDelete: 'cascade',
//     hooks: true
// });
// userRelation.belongsTo(User, { as: 'follower', foreignKey: 'follower_id' });
// userRelation.belongsTo(User, { as: 'followed', foreignKey: 'followed_id' });
