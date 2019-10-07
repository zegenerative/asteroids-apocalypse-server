const express = require('express');
const app = express();

const cors = require('cors');
const corsMiddleware = cors();

const bodyParser = require('body-parser');
const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

const authRouter = require('./auth/router');
const userRouter = require('./User/router');

app.use(corsMiddleware, userRouter, authRouter);

const port = process.env.PORT || 4000;
const db = require('./db');

function onListen() {
  console.log(`Listening on :${port}`);
}

app.listen(port, onListen);
