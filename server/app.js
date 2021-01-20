const auth = require('./shared/auth');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const express = require('express');
const router = require('./router');
const { sequelize } = require('./shared/database');
const status = require('http-status-codes');
// eslint-disable-next-line require-sort/require-sort
require('express-async-errors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(auth.initialize());

app.use('/api', router);

app.use(errorHandler);

app.use((req, res, next) => res.status(status.NOT_FOUND).end());

sequelize.sync()
  .then(() => {
    app.listen(config.PORT, console.log(`Server started on port ${config.PORT}`));
  });

function errorHandler(err, req, res, next) {
  if (!err.status || err.status === 500) {
    console.error(err);
    res.status(500).end();
    return;
  }
  const { status, message } = err;
  res.status(status).json({ error: { status, message } });
}
