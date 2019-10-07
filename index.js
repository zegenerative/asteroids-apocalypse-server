const cors = require('cors');
const corsMiddleware = cors();
const bodyParser = require('body-parser');
const parserMiddleware = bodyParser.json();

const authRouter = require('./auth/router');

const express = require('express');

const app = express();
const port = process.env.PORT || 4000;
const db = require('./db');
const userRouter = require('./User/router');

function onListen() {
  console.log(`Listening on :${port}`);
}

app.use(corsMiddleware, userRouter, parserMiddleware, authRouter);
app.listen(port, onListen);
