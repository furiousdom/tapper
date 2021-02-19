const { BAD_REQUEST, CREATED, NOT_MODIFIED, OK } = require('http-status-codes');
const { Order, ProductOrder } = require('../common/database');
const { ORDER_STATUS: [Active, Reviewed] } = require('../../common/config');

const ALREADY_REPORTED = 208;

function fetch({ query: { userId } }, res) {
  if (!userId) return res.sendStatus(BAD_REQUEST);
  const where = { userId };
  return Order.scope('withAll').findAll({ where })
    .then(orders => res.send(orders.reverse()));
}

async function create({ body: { userId, note, products } }, res) {
  if (!userId) return res.sendStatus(BAD_REQUEST);
  const where = { userId, status: Active };
  const activeOrder = await Order.findOne({ where });
  if (activeOrder) return res.sendStatus(ALREADY_REPORTED);
  const order = await Order.create({ status: Active, userId, note });
  const done = await processOrder(order, products);
  if (done) {
    const final = await Order.scope('withAll').findByPk(order.id);
    return res.status(CREATED).send(final);
  }
}

async function update({ order, body }, res) {
  const { note, products } = body;
  if (order.status !== Active) return res.sendStatus(NOT_MODIFIED);
  await order.update({ note });
  await ProductOrder.destroy({ where: { orderId: order.id } });
  const done = await processOrder(order, products);
  if (done) {
    const final = await Order.scope('withAll').findByPk(order.id);
    return res.status(OK).send(final);
  }
}

async function deliver({ order, body: { status } }, res) {
  if (order.status !== Reviewed) return res.sendStatus(NOT_MODIFIED);
  await order.update({ status });
  return res.send(await Order.scope('withAll').findByPk(order.id));
}

async function remove({ params: { id } }, res) {
  const order = await Order.findByPk(id, { include: ProductOrder });
  if (!order) return res.sendStatus(BAD_REQUEST);
  const where = { orderId: order.id };
  await ProductOrder.destroy({ where });
  const done = await order.destroy();
  if (done) return res.sendStatus(OK);
}

module.exports = { fetch, create, update, deliver, remove };

async function processOrder(order, products) {
  const entries = products.map(({ productId, quantity }) => ({
    quantity, productId, orderId: order.id
  }));
  const productOrders = await ProductOrder.bulkCreate(entries, { returning: true });
  return order.setProductOrders(productOrders);
}
