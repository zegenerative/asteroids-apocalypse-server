const { Router } = require('express');
const Sse = require('json-sse');
const Room = require('../Room/model');
const User = require('../User/model');
const router = new Router();
const auth = require('../auth/middleware');

const allStreams = {};

//this is just one stream
const roomStream = new Sse();
const gameStream = new Sse();

// User can create a room (auth)
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

// Fetch all Rooms data and stream
//lobby
router.get('/stream', async (request, response) => {
  console.log('got a request on stream');
  const rooms = await Room.findAll();
  const data = JSON.stringify(rooms);
  console.log('data is:', data);

  roomStream.updateInit(data);
  roomStream.init(request, response);
});

// Get all rooms
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

// Fetch selected room (auth)
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

// Game stream
router.get('/gameStream/room/:id', async (request, response, next) => {
  const room = await Room.findByPk(parseInt(request.params.id));
  const data = JSON.stringify(room);
  console.log('data is:', data);

  gameStream.updateInit(data);
  gameStream.init(request, response);
});

// Update room  status and current players
router.put('/room/:id', async (request, response) => {
  const { username } = request.body;
  const room = await Room.findByPk(parseInt(request.params.id));

  if (room.status === 'empty') {
    const change = await room.update({
      id: request.params.id,
      status: 'waiting',
      playerOne: username,
    });
    const data = JSON.stringify(change);
    gameStream.send(data);
  } else if (room.status === 'waiting') {
    const change = await room.update({
      id: request.params.id,
      status: 'full',
      playerTwo: username,
    });
    const data = JSON.stringify(change);
    gameStream.send(data);
  } else if (room.status === 'full') {
    return await response.send({
      status: room.status,
      room: room.id,
      message: 'room is already full, redirect to lobby',
    });
  } else {
    return response.status(404).send({ message: 'No such room exists' });
  }

  response.status(200);
  response.send({
    status: room.status,
    room: room.id,
    playerOne: room.playerOne,
    playerTwo: room.playerTwo,
    playerOneScore: room.playerOneScore,
    playerTwoScore: room.playerTwoScore,
    winner: room.winner,
  });
});

module.exports = router;
