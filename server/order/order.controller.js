const { BAD_REQUEST, CREATED, NO_CONTENT, OK } = require('http-status-codes');
const { Brand, Order, Product, ProductOrder } = require('../shared/database');

function fetch({ query: { userId } }, res) {
  const where = userId ? { userId } : null;
  const include = includeAll();
  return Order.findAll({ where, include })
    .then(orders => res.send(orders))
    .catch(err => res.status(BAD_REQUEST).send(err));
}

function fetchOne({ query: { userId } }, res) {
  const where = userId ? { userId } : null;
  const include = includeAll();
  return Order.findOne({ where, include })
    .then(order => order ? res.send(order) : res.sendStatus(NO_CONTENT))
    .catch(err => res.status(BAD_REQUEST).send(err));
}

function create({ body: { userId, note, products } }, res) {
  const where = userId ? { userId, delivered: false } : null;
  return Order.findOne({ where })
    .then(openOrder => {
      if (openOrder) return res.sendStatus(208);
      return Order.create({ delivered: false, userId, note })
        .then(order => processOrder(order, products))
        .then(() => res.sendStatus(CREATED));
    })
    .catch(err => res.status(BAD_REQUEST).send(err));
}

function update(req, res) {
  const { params: { id }, body: { delivered, note, products } } = req;
  return Order.findByPk(id, { include: ProductOrder })
    .then(async order => {
      await order.update({ delivered, note });
      await ProductOrder.destroy({ where: { orderId: id } });
      return processOrder(order, products);
    })
    .then(() => res.sendStatus(OK))
    .catch(err => res.status(BAD_REQUEST).send(err));
}

function remove({ params: { id } }, res) {
  return Order.findByPk(id, { include: ProductOrder })
    .then(async order => {
      const where = { orderId: order.id };
      await ProductOrder.destroy({ where });
      return order.destroy();
    })
    .then(() => res.sendStatus(OK))
    .catch(err => res.status(BAD_REQUEST).send(err));
}

module.exports = { fetch, fetchOne, create, update, remove };

async function processOrder(order, products) {
  const entries = products.map(({ productId, quantity }) => ({
    quantity, productId, orderId: order.id
  }));
  const productOrders = await ProductOrder.bulkCreate(entries, { returning: true });
  return order.setProductOrders(productOrders);
}

function includeAll() {
  const timestamps = [
    'createdAt',
    'updatedAt',
    'deletedAt',
    'orderId',
    'productId',
    'availableLiters'
  ];
  const attributes = { exclude: timestamps };
  return {
    model: ProductOrder,
    attributes,
    include: {
      model: Product,
      attributes,
      include: {
        model: Brand,
        attributes
      }
    }
  };
}
