const { Brand, Order, Product, ProductOrder } = require('../shared/database');
const status = require('http-status-codes');

function fetch({ query: { userId } }, res) {
  const where = userId ? { userId } : null;
  const include = {
    model: ProductOrder,
    include: {
      model: Product,
      include: {
        model: Brand,
        attributes: { exclude: ['availableLiters'] }
      }
    }
  };
  return Order.findAll({ where, include })
    .then(orders => res.send(orders))
    .catch(err => res.status(status.BAD_REQUEST).send(err));
}

function fetchOne({ query: { userId } }, res) {
  const where = userId ? { userId } : null;
  const include = {
    model: ProductOrder,
    include: {
      model: Product,
      include: {
        model: Brand,
        attributes: { exclude: ['availableLiters'] }
      }
    }
  };
  return Order.findOne({ where, include })
    .then(order => res.send(order))
    .catch(err => res.status(status.BAD_REQUEST).send(err));
}

function create({ body: { userId, products } }, res) {
  return Order.create({ delivered: false, userId })
    .then(order => processOrder(order, products))
    .then(() => res.sendStatus(status.CREATED))
    .catch(err => res.status(status.BAD_REQUEST).send(err));
}

function update(req, res) {
  const { params: { id }, body: { delivered, products } } = req;
  return Order.findByPk(id, { include: ProductOrder })
    .then(async order => {
      await order.update({ delivered });
      await ProductOrder.destroy({ where: { orderId: id } });
      return processOrder(order, products);
    })
    .then(() => res.sendStatus(status.OK))
    .catch(err => res.status(status.BAD_REQUEST).send(err));
}

function remove({ params: { id } }, res) {
  return Order.findByPk(id, { include: ProductOrder })
    .then(async order => {
      const where = { orderId: order.id };
      await ProductOrder.destroy({ where });
      return order.destroy();
    })
    .then(() => res.sendStatus(status.OK))
    .catch(err => res.status(status.BAD_REQUEST).send(err));
}

module.exports = { fetch, fetchOne, create, update, remove };

async function processOrder(order, products) {
  const entries = products.map(({ productId, quantity }) => ({
    quantity, productId, orderId: order.id
  }));
  const productOrders = await ProductOrder.bulkCreate(entries, { returning: true });
  return order.setProductOrders(productOrders);
}
