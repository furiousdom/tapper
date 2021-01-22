const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require('http-status-codes');
const auth = require('./common/auth');
const AuthError = require('passport/lib/errors/authenticationerror');
const config = require('./config');
const cors = require('cors');
const express = require('express');
const router = require('./router');
const { sequelize } = require('./common/database');
// eslint-disable-next-line require-sort/require-sort
require('express-async-errors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(auth.initialize());

app.use('/api', router);

app.use((err, req, res, next) => {
  if (!err.status || err.status === INTERNAL_SERVER_ERROR) {
    console.error(err);
    res.status(INTERNAL_SERVER_ERROR).end();
    return;
  } else if (err instanceof AuthError) {
    res.status(err.status).send(err.message);
    return;
  }
  const { status, message } = err;
  res.status(status).json({ error: { status, message } });
});

app.use((req, res, next) => res.status(NOT_FOUND).end());

sequelize.sync()
  .then(() => {
    app.listen(config.PORT, console.log(`Server started on port ${config.PORT}`));
  });
