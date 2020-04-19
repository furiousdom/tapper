const { Brand } = require('../shared/database');
const status = require('http-status-codes');

async function fetch(_, res) {
  try {
    res.send(await Brand.findAll());
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ error });
  }
}

async function create({ body: { name, availableLiters } }, res) {
  try {
    res.status(status.CREATED).send(await Brand.create({
      name,
      availableLiters
    }));
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ error });
  }
}

async function update({ params: { id }, body: { availableLiters } }, res) {
  try {
    const brand = await Brand.findByPk(id);
    brand.availableLiters = availableLiters;
    res.send(await brand.save());
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ error });
  }
}

async function remove({ params: { id } }, res) {
  try {
    const brand = await Brand.findByPk(id);
    const arr = await brand.destroy();
    if (arr) res.sendStatus(status.OK);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({ error });
  }
}

module.exports = { fetch, create, update, remove };
