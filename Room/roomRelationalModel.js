const Sequelize = require('sequelize');
const db = require('../db');

const RoomRelation = db.define('room_relations', {
  playerOneId: {
    type: Sequelize.STRING,
  },
  playerTwoId: {
    type: Sequelize.STRING,
  },
});

module.exports = RoomRelation;
