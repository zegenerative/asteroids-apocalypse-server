const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define(
  'users',
  {
    userName: {
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
    currentScore: {
      type: Sequelize.INTEGER,
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
