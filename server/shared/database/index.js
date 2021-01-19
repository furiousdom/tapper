const config = require('../../config/config');
const forEach = require('lodash/forEach');
const Hooks = require('./hooks');
const invoke = require('lodash/invoke');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

/* eslint-disable require-sort/require-sort */
const Brand = require('../../brand/brand.model');
const Order = require('../../order/order.model');
const Product = require('../../product/product.model');
const ProductOrder = require('../../order/productOrder.model');
const User = require('../../user/user.model');

const models = {
  Brand: defineModel(Brand),
  Order: defineModel(Order),
  Product: defineModel(Product),
  ProductOrder: defineModel(ProductOrder),
  User: defineModel(User)
};

function defineModel(Model, connection = sequelize) {
  const { DataTypes } = Sequelize;
  const fields = invoke(Model, 'fields', DataTypes, this.sequelize) || {};
  return Model.init(fields, { sequelize: connection });
}

forEach(models, model => {
  invoke(model, 'associate', models);
  addHooks(model, Hooks);
});

function addHooks(model, Hooks) {
  const hooks = invoke(model, 'hooks', Hooks);
  forEach(hooks, (it, type) => model.addHook(type, it));
}

const db = {
  sequelize,
  Sequelize,
  ...models
};

module.exports = db;
