const config = require('../config/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

const db = {
  Brand: sequelize.import('./models/Brand'),
  Order: sequelize.import('./models/Order'),
  Product: sequelize.import('./models/Product'),
  ProductOrder: sequelize.import('./models/ProductOrder'),
  User: sequelize.import('./models/User')
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
