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

const allStreams = {};

//this is just one stream
const roomStream = new Sse();
const gameStream = new Sse();

router.post('/room', auth, async (request, response) => {
  // console.log('got a request on /message', request.body);
  const { galaxyName } = request.body;
  const entity = await Room.create({
    galaxyName,
  });

  const room = await Room.findAll();
  const data = JSON.stringify(room);
  roomStream.send(data);
  response.status(200);
  response.send('room created');
});

// Fetch all Rooms data for stats (GET, authentication required)
//lobby
router.get('/stream', async (request, response) => {
  console.log('got a request on stream');
  const rooms = await Room.findAll();
  const data = JSON.stringify(rooms);
  console.log('data is:', data);

  roomStream.updateInit(data);
  roomStream.init(request, response);
});

router.get('/room', (request, response, next) => {
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

router.get('/gameStream/room/:id', async (request, response, next) => {
  const room = await Room.findByPk(parseInt(request.params.id));
  const data = JSON.stringify(room);
  console.log('data is:', data);

  gameStream.updateInit(data);
  gameStream.init(request, response);

  // .then(room => {
  //   if (!room) {
  //     return response.status(404).send({ message: 'Galaxy does not exist' });
  //   } else {
  //     return response.send(room);
  //   }
  // })
  // .catch(error => next(error));
});

// Update selected Room (PUT, authentication required --> ADD MIDDLEWARE IF MISSING!)
// router.put('/room/:id', auth, (request, response) => {
//   //console.log(parseInt(request.params.id));
//   //console.log('req body:', request.body);
//   Room.findByPk(parseInt(request.params.id)).then(room => {
//     //console.log(room.dataValues);
//     if (room.status === 'empty') {
//       return room
//         .update({
//           roomId: request.params.id,
//           status: 'waiting',
//         })
//         .then(room => {
//           return response
//             .status(200)
//             .send({ status: room.status, room: room.id, message: 'ok' });
//         });
//     } else if (room.status === 'waiting') {
//       return room
//         .update({
//           roomId: request.params.id,
//           status: 'full',
//         })
//         .then(room => {
//           return response
//             .status(200)
//             .send({ status: room.status, room: room.id });
//         });
//     } else if (room.status === 'full') {
//       return response.send({
//         status: room.status,
//         room: room.id,
//         message: 'room is already full, redirect to lobby',
//       });
//       //.then(() => response.redirect('/room')); this does not work
//       // how to redirect to lobby here?
//     } else {
//       return response.status(404).send({ message: 'No such room exists' });
//     }
//   });
// });

router.put('/room/:id', async (request, response) => {
  const room = await Room.findByPk(parseInt(request.params.id));

  if (room.status === 'empty') {
    const change = await room.update({
      roomId: request.params.id,
      status: 'waiting',
    });
    const data = JSON.stringify(change);
    gameStream.send(data);
    // roomStream.send(data);
  } else if (room.status === 'waiting') {
    const change = await room.update({
      roomId: request.params.id,
      status: 'full',
    });
    const data = JSON.stringify(change);
    gameStream.send(data);
    // roomStream.send(data);
  } else if (room.status === 'full') {
    return await response.send({
      status: room.status,
      room: room.id,
      message: 'room is already full, redirect to lobby',
    });
  } else {
    return response.status(404).send({ message: 'No such room exists' });
  }
  // const data = JSON.stringify(change);
  // gameStream.send(data);
  response.status(200);
  response.send({
    status: room.status,
    room: room.id,
  });
});

module.exports = router;
