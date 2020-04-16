const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const express = require('express');
const { sequelize } = require('./shared/database/index');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', require('./auth'));
app.use('/order', require('./order'));
app.use('/brand', require('./brand'));
app.use('/product', require('./product'));

sequelize.sync()
  .then(() => {
    app.listen(config.PORT, console.log(`Server started on port ${config.PORT}`));
  });
