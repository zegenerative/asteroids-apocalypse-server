const { Router } = require('express');
const User = require('./model');
const router = new Router();
const bcrypt = require('bcrypt');
const db = require('../db');
// const Sequelize = require('sequelize');

// Create new user
router.post('/user', (request, response) => {
  console.log('request.body post to /user', request.body);
  const { email, password, userName } = request.body;
  const user = {
    email: email,
    password: bcrypt.hashSync(password, 10),
    userName,
  };

  console.log('user', user);

  User.create(user)
    .then(result =>
      response.send({
        email: result.email,
        pasword: result.password,
        id: result.id,
      })
    )
    .catch(console.error);
});

// Get user profile from db

module.exports = router;
