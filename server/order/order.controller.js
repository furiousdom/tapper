const { BAD_REQUEST, CREATED, NO_CONTENT, NOT_MODIFIED, OK } = require('http-status-codes');
const { Order, ProductOrder } = require('../common/database');
const { ORDER_STATUS: [OPEN, REVIEWED, CLOSED] } = require('../config/shared');

const ALREADY_REPORTED = 208;

function getClosed({ query: { userId } }, res) {
  if (!userId) return res.sendStatus(BAD_REQUEST);
  const where = { userId, status: CLOSED };
  return Order.scope('includeEverything').findAll({ where })
    .then(orders => res.send(orders.reverse()));
}

function getOpen({ query: { userId } }, res) {
  if (!userId) return res.sendStatus(BAD_REQUEST);
  const where = { userId, status: [OPEN, REVIEWED] };
  return Order.scope('includeEverything').findOne({ where })
    .then(order => order ? res.send(order) : res.sendStatus(NO_CONTENT));
}

async function create({ body: { userId, note, products } }, res) {
  if (!userId) return res.sendStatus(BAD_REQUEST);
  const where = { userId, status: OPEN };
  const openedOrder = await Order.findOne({ where });
  if (openedOrder) return res.sendStatus(ALREADY_REPORTED);
  const order = await Order.create({ status: OPEN, userId, note });
  const done = await processOrder(order, products);
  if (done) {
    const final = await Order.scope('includeEverything').findByPk(order.id);
    return res.status(CREATED).send(final);
  }
}

async function update(req, res) {
  const { params: { id }, body: { note, products } } = req;
  const order = await Order.findByPk(id, { include: ProductOrder });
  if (!order) return res.sendStatus(BAD_REQUEST);
  if (order.status !== OPEN) return res.sendStatus(NOT_MODIFIED);
  await order.update({ note });
  await ProductOrder.destroy({ where: { orderId: id } });
  const done = await processOrder(order, products);
  if (done) {
    const final = await Order.scope('includeEverything').findByPk(order.id);
    return res.status(OK).send(final);
  }
}

async function setClosed(req, res) {
  const { params: { id }, body: { status } } = req;
  const order = await Order.findByPk(id);
  if (!order) return res.sendStatus(BAD_REQUEST);
  if (order.status !== REVIEWED) return res.sendStatus(NOT_MODIFIED);
  const { changed } = await order.update({ status });
  return res.sendStatus(changed ? OK : ALREADY_REPORTED);
}

async function remove({ params: { id } }, res) {
  const order = await Order.findByPk(id, { include: ProductOrder });
  if (!order) return res.sendStatus(BAD_REQUEST);
  const where = { orderId: order.id };
  await ProductOrder.destroy({ where });
  const done = await order.destroy();
  if (done) return res.sendStatus(OK);
}

module.exports = { getClosed, getOpen, create, update, setClosed, remove };

async function processOrder(order, products) {
  const entries = products.map(({ productId, quantity }) => ({
    quantity, productId, orderId: order.id
  }));
  const productOrders = await ProductOrder.bulkCreate(entries, { returning: true });
  return order.setProductOrders(productOrders);
}
