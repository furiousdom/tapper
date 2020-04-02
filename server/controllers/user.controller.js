const { Order } = require('../database');

async function fetch(req, res) {
  try {
    res.send(await Order.findAll());
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function create({ body: { status, userId } }, res) {
  try {
    res.send(await Order.create({
      date: new Date(),
      status,
      userId
    }));
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function update({ params: { id }, body: { status } }, res) {
  try {
    console.log(id, status);
    const order = await Order.findByPk(id);
    console.log(order);
    order.status = !status;
    res.send(await order.save());
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function remove({ params: { id } }, res) {
  try {
    const order = await Order.findByPk(id);
    const arr = await order.destroy();
    if (arr) res.status(204).send();
  } catch (error) {
    res.status(500).send({ error });
  }
}

module.exports = { fetch, create, update, remove };
