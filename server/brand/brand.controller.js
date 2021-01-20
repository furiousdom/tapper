const { Brand } = require('../shared/database');
const status = require('http-status-codes');

async function fetch(_, res) {
  res.send(await Brand.findAll());
}

async function create({ body: { name, availableLiters } }, res) {
  const brand = await Brand.create({ name, availableLiters });
  res.status(status.CREATED).send(brand);
}

async function update({ params: { id }, body: { availableLiters } }, res) {
  const brand = await Brand.findByPk(id);
  brand.availableLiters = availableLiters;
  res.send(await brand.save());
}

async function remove({ params: { id } }, res) {
  const brand = await Brand.findByPk(id);
  const arr = await brand.destroy();
  if (arr) res.sendStatus(status.OK);
}

async function getQuantity(req, res) {
  const { params: { id }, body: { divisor } } = req;
  const { availableLiters } = await Brand.findByPk(id);
  const length = Math.floor(availableLiters / divisor);
  res.send(Array.from({ length }, (_, i) => i + 1));
}

module.exports = { fetch, create, update, remove, getQuantity };
