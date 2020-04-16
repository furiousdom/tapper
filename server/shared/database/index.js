const config = require('../../config/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

const db = {
  Brand: sequelize.import('../../brand/brand.model'),
  Order: sequelize.import('../../order/order.model'),
  Product: sequelize.import('../../product/product.model'),
  ProductOrder: sequelize.import('./models/productOrder.model'),
  User: sequelize.import('../../user/user.model')
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
