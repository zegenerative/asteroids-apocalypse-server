const { Router } = require('express');
const Room = require('../Room/model');
const User = require('../User/model');
const router = new Router();
const auth = require('../auth/middleware');

// User can create a room

router.post('/room', auth, (request, response) => {
  if (request.body.galaxyName) {
    Room.create(request.body)
      .then(result => {
        return response.status(201).send(result);
      })
      .catch(error => {
        if (error.name === 'SequelizeValidationError') {
          return response
            .status(422)
            .send({ message: 'Galaxy name cannot be null' });
        } else {
          return response.status(400).send({ message: 'Bad request' });
        }
      });
  }
});

// Get all rooms for stats endpoint

router.get('/room', auth, (request, response, next) => {
  Room.findAll()
    .then(rooms => {
      if (rooms.length === 0) {
        return response.status(404).send({ message: 'Rooms not found' });
      } else {
        return response.send(rooms);
      }
    })
    .catch(error => next(error));
});

module.exports = router;
