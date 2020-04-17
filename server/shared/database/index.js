const config = require('../../config/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

// Database models
const Brand = sequelize.import('../../brand/brand.model');
const Order = sequelize.import('../../order/order.model');
const Product = sequelize.import('../../product/product.model');
const ProductOrder = sequelize.import('../../order/productOrder.model');
const User = sequelize.import('../../user/user.model');

const models = {
  Brand,
  Order,
  Product,
  ProductOrder,
  User
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) models[modelName].associate(models);
});

const db = {
  sequelize,
  Sequelize,
  ...models
};

module.exports = db;
