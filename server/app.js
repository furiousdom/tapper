const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const express = require('express');
const { sequelize } = require('./database/index');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/users', require('./routes/users'));

sequelize.sync()
  .then(() => {
    app.listen(config.PORT, console.log(`Server started on port ${config.PORT}`));
  });
