require('dotenv').config();
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require('http-status-codes');
const auth = require('./common/auth');
const AuthError = require('passport/lib/errors/authenticationerror');
const config = require('./config');
const cors = require('cors');
const express = require('express');
const { HttpError } = require('http-errors');
const router = require('./router');
const { sequelize } = require('./common/database');
// eslint-disable-next-line require-sort/require-sort
require('express-async-errors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(auth.initialize());

app.use(config.apiPath, router);

app.use((err, req, res, next) => {
  if ((err instanceof HttpError) || (err instanceof AuthError)) {
    return res.status(err.status).send(err.message);
  }
  res.status(INTERNAL_SERVER_ERROR).end();
  console.error({ req, err }, '🚨  Internal Error:', err.message);
});

app.use((req, res, next) => res.status(NOT_FOUND).end());

sequelize.sync()
  .then(() => {
    app.listen(config.port, console.log(`Server started on port ${config.port}`));
  });
