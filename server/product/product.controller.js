const { BAD_REQUEST, OK } = require('http-status-codes');
const { Product } = require('../common/database');

const ALREADY_REPORTED = 208;

async function fetch(_, res) {
  return res.send(await Product.findAll());
}

async function get({ params: { id } }, res) {
  const product = await Product.findByPk(id);
  if (!product) return res.sendStatus(BAD_REQUEST);
  return res.send(product);
}

// TODO: Make name case and space insensitive?
async function create({ body }, res) {
  const { packageVolume, packageType, brand, availableQuantity } = body;
  const where = { packageVolume, packageType, brand };
  const product = await Product.findOne({ where });
  if (product) return res.sendStatus(ALREADY_REPORTED);
  const attributes = { packageVolume, packageType, brand, availableQuantity };
  return res.send(await Product.create(attributes));
}

async function update({ params: { id }, body }, res) {
  const { packageVolume, packageType, brand, availableQuantity } = body;
  const product = await Product.findByPk(id);
  if (!product) return res.sendStatus(BAD_REQUEST);
  const updatedInfo = { packageVolume, packageType, brand, availableQuantity };
  const updatedProduct = await product.update(updatedInfo);
  return res.send(updatedProduct);
}

async function remove({ params: { id } }, res) {
  const product = await Product.findByPk(id);
  if (!product) return res.sendStatus(BAD_REQUEST);
  const arr = await product.destroy();
  if (arr) return res.sendStatus(OK);
}

module.exports = { fetch, get, create, update, remove };
