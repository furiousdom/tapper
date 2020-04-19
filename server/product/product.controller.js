const { Brand, Product } = require('../shared/database');
const status = require('http-status-codes');

async function fetch(_, res) {
  try {
    res.send(await Product.findAll({ include: Brand }));
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ error });
  }
}

async function create({ body: { type, liters, brandId } }, res) {
  try {
    res.send(await Product.create({ type, liters, brandId }));
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ error });
  }
}

async function update({ params: { id }, body: { type, liters, brandId } }, res) {
  try {
    const product = await Product.findByPk(id);
    product.type = type;
    product.liters = liters;
    product.brandId = brandId;
    res.send(await product.save());
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ error });
  }
}

async function remove({ params: { id } }, res) {
  try {
    const product = await Product.findByPk(id);
    const arr = await product.destroy();
    if (arr) res.status(status.OK).send();
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ error });
  }
}

module.exports = { fetch, create, update, remove };
