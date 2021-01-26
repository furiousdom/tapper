const { Brand, Order, Product, ProductOrder } = require('../common/database');
const { CREATED, NO_CONTENT, NOT_MODIFIED, OK } = require('http-status-codes');

function getClosed({ query: { userId } }, res) {
  const where = userId ? { userId, status: 'CLOSED' } : null;
  const include = includeAll();
  return Order.findAll({ where, include })
    .then(orders => res.send(orders.reverse()));
}

function getOpen({ query: { userId } }, res) {
  const where = userId ? { userId, status: ['OPEN', 'REVIEWED'] } : null;
  const include = includeAll();
  return Order.findOne({ where, include })
    .then(order => order ? res.send(order) : res.sendStatus(NO_CONTENT));
}

function create({ body: { userId, note, products } }, res) {
  const where = userId ? { userId, status: 'OPEN' } : null;
  return Order.findOne({ where })
    .then(openOrder => {
      if (openOrder) return res.sendStatus(208);
      return Order.create({ status: 'OPEN', userId, note })
        .then(order => processOrder(order, products))
        .then(() => res.sendStatus(CREATED));
    });
}

function update(req, res) {
  const { params: { id }, body: { note, products } } = req;
  return Order.findByPk(id, { include: ProductOrder })
    .then(async order => {
      if (order.status !== 'OPEN') return res.sendStatus(NOT_MODIFIED);
      await order.update({ note });
      await ProductOrder.destroy({ where: { orderId: id } });
      return processOrder(order, products);
    })
    .then(() => res.sendStatus(OK));
}

function setClosed(req, res) {
  const { params: { id }, body: { status } } = req;
  return Order.findByPk(id)
    .then(async order => {
      if (order.status !== 'REVIEWED') return res.sendStatus(NOT_MODIFIED);
      const { changed } = await order.update({ status });
      return res.sendStatus(changed ? OK : NOT_MODIFIED);
    });
}

function remove({ params: { id } }, res) {
  return Order.findByPk(id, { include: ProductOrder })
    .then(async order => {
      const where = { orderId: order.id };
      await ProductOrder.destroy({ where });
      return order.destroy();
    })
    .then(() => res.sendStatus(OK));
}

module.exports = { getClosed, getOpen, create, update, setClosed, remove };

async function processOrder(order, products) {
  const entries = products.map(({ productId, quantity }) => ({
    quantity, productId, orderId: order.id
  }));
  const productOrders = await ProductOrder.bulkCreate(entries, { returning: true });
  return order.setProductOrders(productOrders);
}

function includeAll() {
  // TODO: Maybe include brandId, as well.
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
