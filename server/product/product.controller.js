const { OK } = require('http-status-codes');
const { Product } = require('../common/database');

const ALREADY_REPORTED = 208;

async function fetch(_, res) {
  return res.send(await Product.findAll());
}

// TODO: Make name case and space insensitive?
async function create({ body: { volume, type, brand, quantity } }, res) {
  const where = { volume, type, brand };
  const product = await Product.findOne({ where });
  if (product) return res.sendStatus(ALREADY_REPORTED);
  return res.send(await Product.create({ volume, type, brand, quantity }));
}

// TODO: Make changing the brand name impossible
async function update(req, res) {
  const { params: { id }, body: { volume, type, brand, quantity } } = req;
  const product = await Product.findByPk(id);
  const updatedProduct = await product.update({ volume, type, brand, quantity });
  return res.send(updatedProduct);
}

async function remove({ params: { id } }, res) {
  const product = await Product.findByPk(id);
  const arr = await product.destroy();
  if (arr) return res.sendStatus(OK);
}

module.exports = { fetch, create, update, remove };
