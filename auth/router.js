const { Router } = require('express');
const { toJWT, toData } = require('./jwt');
const User = require('../User/model');
const bcrypt = require('bcrypt');
const auth = require('./middleware');

const router = new Router();

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password) {
    res.status(400).send({
      message: 'Please supply a valid email and password',
    });
  } else {
    // Find user based on email address
    User.findOne({
      where: {
        email: email,
      },
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: 'User with that email does not exist',
          });
        }
        // Use bcrypt.compareSync to check the password against the stored hash
        else if (bcrypt.compareSync(req.body.password, entity.password)) {
          // If the password is correct, return a JWT with the id of the user
          res.send({
            jwt: toJWT({ userId: entity.id }),
            username: entity.username,
            id: entity.id,
          });
        } else {
          res.status(400).send({
            message: 'Password was incorrect',
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: 'Something went wrong',
        });
      });
  }
});

module.exports = router;
