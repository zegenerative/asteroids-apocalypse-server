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
