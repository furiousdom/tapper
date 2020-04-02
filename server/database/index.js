const Sequelize = require('sequelize');
const config = require('../config/config');
// const db = {};
// const fs = require('fs');
// const path = require('path');

// const modelsDir = path.join(__dirname, 'models');
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

// fs.readdirSync(modelsDir)
//   .forEach(file => {
//     const model = sequelize.import(path.join(modelsDir, file));
//     db[model.name] = model;
//   });

const db = {
  Beer: sequelize.import('./models/Beer'),
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
