const Sequelize = require('sequelize');
const db = require('../db');

const Room = db.define(
  'rooms',
  {
    galaxyName: {
      type: Sequelize.STRING,
      allowNull: false,
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
  }
  // {
  //   tableName: 'room',
  // }
);

module.exports = Room;
