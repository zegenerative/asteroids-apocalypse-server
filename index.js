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

// Use middleware
app.use(corsMiddleware);
app.use(parserMiddleware);
app.use(userRouter, authRouter, roomRouter);

// Sync Db and create default rooms
db.sync({ force: true }).then(() =>
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

// Port set-up
const port = process.env.PORT || 4000;

function onListen() {
  console.log(`Listening on :${port}`);
}

app.listen(port, onListen);
