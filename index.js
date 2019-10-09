// Import DB
const db = require('./db');

// Express setup
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
const corsMiddleware = cors();
const bodyParser = require('body-parser');
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
    status: {
      values: ['empty', 'waiting', 'full', 'done'],
      defaultValue: 'empty',
    },
  },
  {
    galaxyName: 'Jupiter',
    status: {
      values: ['empty', 'waiting', 'full', 'done'],
      defaultValue: 'empty',
    },
  },
  {
    galaxyName: 'Milky Way',
    status: {
      values: ['empty', 'waiting', 'full', 'done'],
      defaultValue: 'empty',
    },
  },
]).catch(console.error);

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
