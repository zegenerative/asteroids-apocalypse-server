const Sequelize = require('sequelize');
const db = require('../db');

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
    type: Sequelize.INTEGER,
    // allowNull: false,
  },
  playerTwoId: {
    type: Sequelize.INTEGER,
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

module.exports = Room;
