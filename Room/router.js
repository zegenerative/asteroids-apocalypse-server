const { Router } = require('express');
const Room = require('../Room/model');
const User = require('../User/model');
const router = new Router();
const auth = require('../auth/middleware');

// User can create a room (POST, authentication required)

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

// Fetch all Rooms data for stats (GET, authentication required)

router.get('/room', auth, (request, response, next) => {
  Room.findAll({
    order: [['createdAt', 'DESC']],
  })
    .then(rooms => {
      if (rooms.length === 0) {
        return response.status(404).send({ message: 'Galaxy not found' });
      } else {
        return response.send(rooms);
      }
    })
    .catch(error => next(error));
});

// Fetch selected room (GET, authentication required --> ADD)

router.get('/room/:id', auth, (request, response, next) => {
  Room.findByPk(parseInt(request.params.id))
    .then(room => {
      if (!room) {
        return response.status(404).send({ message: 'Galaxy does not exist' });
      } else {
        return response.send(room);
      }
    })
    .catch(error => next(error));
});

// Update selected Room (PUT, authentication required --> ADD) FIX VALIDATION

// FOR LATER: add if (room.status === "waiting" && room.users.length < 2)

router.put('/room/:id', auth, (request, response) => {
  //console.log(parseInt(request.params.id));
  //console.log('req body:', request.body);
  Room.findByPk(parseInt(request.params.id)).then(room => {
    //console.log(room.dataValues);
    if (room.status === 'empty') {
      return room
        .update({
          roomId: request.params.id,
          status: 'waiting',
        })
        .then(room => {
          return response
            .status(200)
            .send({ status: room.status, room: room.id, message: 'ok' });
        });
    } else if (room.status === 'waiting') {
      return room
        .update({
          roomId: request.params.id,
          status: 'full',
        })
        .then(room => {
          return response
            .status(200)
            .send({ status: room.status, room: room.id });
        });
    } else if (room.status === 'full') {
      return room.update(request.body).then(room => {
        return (
          response
            // .status(200)
            //.then(Response.redirect('/room'))
            .send({ status: room.status, room: room.id })
        ); // --> we want to redirect to the lobby at this point
      });
    } else {
      return response.status(404).send({ message: 'No such room exists' });
    }
  });
});

module.exports = router;
