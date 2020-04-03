const { Product } = require('../database');

async function fetch(_, res) {
  try {
    res.send(await Product.findAll());
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function create({ body: { type, liters, brandId } }, res) {
  try {
    res.send(await Product.create({ type, liters, brandId }));
  } catch (error) {
    res.status(500).send({ error });
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
    res.status(500).send({ error });
  }
}

async function remove({ params: { id } }, res) {
  try {
    const product = await Product.findByPk(id);
    const arr = await product.destroy();
    if (arr) res.status(204).send();
  } catch (error) {
    res.status(500).send({ error });
  }
}

module.exports = { fetch, create, update, remove };
