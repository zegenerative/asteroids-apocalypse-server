const Sequelize = require('sequelize');
const db = require('../db');
const roomRelation = require('./roomRelationalModel');
const User = require('../User/model');

const Room = db.define('room', {
  galaxyName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    values: ['empty', 'waiting', 'full', 'done'],
    defaultValue: 'empty',
  },
  playerOneId: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  playerTwoId: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  playerOneScore: {
    type: Sequelize.INTEGER,
  },
  playerTwoScore: {
    type: Sequelize.INTEGER,
  },
  winner: {
    type: Sequelize.INTEGER,
  },
});

Room.hasMany(User);
User.belongsTo(Room);
//console.log('Room.users test', Room.Users);

Room.belongsToMany(User, {
  as: 'playerOne',
  through: roomRelation,
  foreignKey: 'playerOneId',
});
Room.belongsToMany(User, {
  as: 'playerTwo',
  through: roomRelation,
  foreignKey: 'playerTwoId',
});
roomRelation.belongsTo(Room, { as: 'playerOne', foreignKey: 'player_id' });
roomRelation.belongsTo(Room, { as: 'playerTwo', foreignKey: 'player_id' });

module.exports = Room;

// A room has multiple users; a user is in one room at a time
