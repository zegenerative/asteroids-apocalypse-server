const Sequelize = require('sequelize');
const db = require('../db');

const RoomRelation = db.define('room_relations', {
  playerOneId: {
    type: Sequelize.INTEGER,
  },
  playerTwoId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = RoomRelation;
