const Sequelize = require('sequelize');
const { Router } = require('express');
const User = require('./model');
const router = new Router();
const bcrypt = require('bcrypt');
const db = require('../db');
const auth = require('../auth/middleware');

// Create new user

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

// Update a user: totalScore and rank FIX ME, add validation logic!

router.put('/user/:id', (request, response) => {
  console.log(parseInt(request.params.id));
  console.log('req body:', request.body);
  User.findByPk(parseInt(request.params.userId)).then(user => {
    //console.log(user.dataValues);
    if (user) {
      return user
        .update({ id: request.params.id, totalScore: user.totalScore + 1 })
        .then(user => {
          console.log('UPDATED user:', user.dataValues);
          return response.json(user);
        });
    } else {
      return response.status(404).send({ message: 'No such user exists' });
    }
  });
});

module.exports = router;
