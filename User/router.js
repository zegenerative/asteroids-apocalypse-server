const Sequelize = require('sequelize');
const { Router } = require('express');
const User = require('./model');
const router = new Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// Create new user
// OLD WAY (no checks)
// router.post('/user', (request, response) => {
//   console.log('request.body post to /user', request.body);
//   const { email, password, userName } = request.body;
//   const user = {
//     email: email,
//     password: bcrypt.hashSync(password, 10),
//     userName,
//   };

//   console.log('user', user);

//   User.create(user)
//     .then(result =>
//       response.send({
//         email: result.email,
//         id: result.id,
//       })
//     )
//     .catch(console.error);
// });

router.post('/user', (req, res, next) => {
  const { email, password, username } = req.body;

  // All data should be provided
  if (email && password && username) {
    const user = {
      email,
      password: bcrypt.hashSync(password, 10),
      username,
    };
    console.log(user);

    // check if email or username is already used
    User.findOne({
      where: { email },
      attributes: ['email'],
    })
      .then(result => {
        if (result) {
          res.status(400).send({ message: 'Email already in use' });
        }
      })
      // Email not in use, check username
      .then(() => {
        return User.findOne({
          where: { username: { [Sequelize.Op.iLike]: username } },
          attributes: ['username'],
        });
      })
      .then(result => {
        if (result) {
          res.status(400).send({ message: 'Username already in use' });
        }
      })
      // Username also not in use, create user
      .then(() => {
        return User.create(user);
      })
      .then(() => {
        res.status(201).end();
      })
      .catch(console.error);
  } else {
    res.status(400).send({ message: 'Not all data provided' });
  }
});

// Get user profile from db

module.exports = router;
