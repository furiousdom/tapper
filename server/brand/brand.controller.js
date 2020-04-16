const { Brand } = require('../shared/database');

async function fetch(_, res) {
  try {
    res.send(await Brand.findAll());
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function create({ body: { name, availableLiters } }, res) {
  try {
    res.send(await Brand.create({
      name,
      availableLiters
    }));
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function update({ params: { id }, body: { availableLiters } }, res) {
  try {
    const brand = await Brand.findByPk(id);
    brand.availableLiters = availableLiters;
    res.send(await brand.save());
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function remove({ params: { id } }, res) {
  try {
    const brand = await Brand.findByPk(id);
    const arr = await brand.destroy();
    if (arr) res.status(204).send();
  } catch (error) {
    res.status(500).send({ error });
  }
}

module.exports = { fetch, create, update, remove };
