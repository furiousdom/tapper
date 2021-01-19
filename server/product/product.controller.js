const { Brand, Product } = require('../shared/database');
const status = require('http-status-codes');

async function fetch(_, res) {
  const include = { model: Brand };
  res.send(await Product.findAll({ include }));
}

async function create({ body: { type, liters, brandId } }, res) {
  res.send(await Product.create({ type, liters, brandId }));
}

async function update({ params: { id }, body: { type, liters, brandId } }, res) {
  const product = await Product.findByPk(id);
  product.type = type;
  product.liters = liters;
  product.brandId = brandId;
  res.send(await product.save());
}

async function remove({ params: { id } }, res) {
  const product = await Product.findByPk(id);
  const arr = await product.destroy();
  if (arr) res.status(status.OK).send();
}

module.exports = { fetch, create, update, remove };
