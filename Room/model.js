const Sequelize = require('sequelize');
const db = require('../db');
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
  playerOne: {
    type: Sequelize.STRING,
  },
  playerTwo: {
    type: Sequelize.STRING,
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

module.exports = Room;
