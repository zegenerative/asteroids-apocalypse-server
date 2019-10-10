// Import DB
const db = require('./db');

// Express setup
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
const corsMiddleware = cors();
const bodyParser = require('body-parser');
const Sse = require('json-sse');
const parserMiddleware = bodyParser.json();

// Models
const Room = require('./Room/model');
const User = require('./User/model');

// Routers
const authRouter = require('./auth/router');
const userRouter = require('./User/router');
const roomRouter = require('./Room/router');

// Sync Db and create default rooms
db.sync({ force: false }).then(() =>
  console.log('Database successfully created')
);

Room.bulkCreate([
  {
    galaxyName: 'XYZ9',
    status: 'empty',
  },
  {
    galaxyName: 'Jupiter',
    status: 'empty',
  },
  {
    galaxyName: 'Milky Way',
    status: 'empty',
  },
]).catch(console.error);

// Setup stream
const stream = new Sse();

// Use middleware
app.use(corsMiddleware);
app.use(parserMiddleware);
app.use(userRouter, authRouter, roomRouter);

// Port set-up
const port = process.env.PORT || 4000;

function onListen() {
  console.log(`Listening on :${port}`);
}

app.listen(port, onListen);

// Stream

app.get('/stream', async (request, response) => {
  console.log('got a request on stream');
  const rooms = await Room.findAll();
  const data = JSON.stringify(rooms);
  console.log('data is:', data);

  stream.updateInit(data);
  stream.init(request, response);
});
