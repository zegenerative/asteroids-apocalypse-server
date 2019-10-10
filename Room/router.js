const { Router } = require('express');
const Sse = require('json-sse');
const Room = require('../Room/model');
const User = require('../User/model');
const router = new Router();
const auth = require('../auth/middleware');

// User can create a room (POST, authentication required)

// router.post('/room', auth, (request, response) => {
//   if (request.body.galaxyName) {
//     Room.create(request.body)
//       .then(result => {
//         return response.status(201).send(result);
//       })
//       .catch(error => {
//         if (error.name === 'SequelizeValidationError') {
//           return response
//             .status(422)
//             .send({ message: 'Galaxy name cannot be null' });
//         } else {
//           return response.status(400).send({ message: 'Bad request' });
//         }
//       });
//   }
// });

const allStreams = {}

//this is just one stream
const galaxyStream = new Sse();
const roomStream = new Sse()

router.post('/room', auth, async (request, response) => {
  // console.log('got a request on /message', request.body);
  const { galaxyName } = request.body;
  const entity = await Room.create({
    galaxyName,
  });

  const room = await Room.findAll();
  const data = JSON.stringify(room);
  galaxyStream.send(data);
  response.status(200);
  response.send('room created');
});

//lobby
router.get('/stream', async (request, response) => {
  console.log('got a request on stream');
  const rooms = await Room.findAll();
  const data = JSON.stringify(rooms);
  console.log('data is:', data);

  galaxyStream.updateInit(data);
  galaxyStream.init(request, response);
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

// Fetch selected room (GET, authentication required --> ADD MIDDLEWARE IF MISSING)

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

// Update selected Room (PUT, authentication required --> ADD MIDDLEWARE IF MISSING!)

// FOR LATER: add if (room.status === "waiting" && room.users.length < 2)

router.put('/room/:id', auth, async (request, response) => {

  const room = await Room.findByPk(parseInt(request.params.id))
    if (room.status === 'empty') {
        const change = room.update({
          roomId: request.params.id,
          status: 'waiting',
        })
        const data = JSON.stringify(change);
        stream.send(data);

    } else  if (room.status === 'waiting') {
      const change = room.update({
        roomId: request.params.id,
        status: 'full',
      })
      stream.send(change);

    } else if (room.status === 'full') {
      return response.send({
        status: room.status,
        room: room.id,
        message: 'room is already full, redirect to lobby',
      });

    } else {
      return response.status(404).send({ message: 'No such room exists' });
    }
});


module.exports = router;
