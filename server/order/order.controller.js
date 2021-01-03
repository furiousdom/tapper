const { Brand, Order, Product, ProductOrder } = require('../shared/database');
const status = require('http-status-codes');

function fetch({ query: { userId } }, res) {
  const where = userId ? { userId } : null;
  const include = {
    model: ProductOrder,
    as: 'products',
    include: {
      model: Product,
      as: 'product',
      include: {
        model: Brand,
        as: 'brand',
        attributes: { exclude: ['availableLiters'] }
      }
    }
  };
  return Order.findAll({ where, include })
    .then(orders => res.send(orders))
    .catch(err => res.status(status.BAD_REQUEST).send(err));
}

function create({ body: { userId, products } }, res) {
  return Order.create({ delivered: false, userId })
    .then(order => {
      return ProductOrder.bulkCreate(products.map(({ productId, quantity }) => {
        return {
          quantity,
          productId,
          orderId: order.id
        };
      }), { returning: true })
        .then(products => order.setProductOrders(products));
    })
    .then(() => res.sendStatus(status.CREATED))
    .catch(err => res.status(status.BAD_REQUEST).send(err));
}

function update(req, res) {
  const { params: { id }, body: { delivered, products } } = req;
  return Order.findByPk(id, { include: ProductOrder })
    .then(async order => {
      await order.update({ delivered });
      ProductOrder.destroy({ where: { orderId: id } });
      ProductOrder.bulkCreate(products.map(({ productId, quantity }) => {
        return {
          quantity,
          productId,
          orderId: order.id
        };
      }), { returning: true })
        .then(products => order.setProductOrders(products));
    })
    .then(() => res.sendStatus(status.OK))
    .catch(err => res.status(status.BAD_REQUEST).send(err));
}

function remove({ params: { id } }, res) {
  return Order.findByPk(id, { include: ProductOrder })
    .then(order => {
      ProductOrder.destroy({ where: { orderId: order.id } })
        .then(() => order.destroy());
    })
    .then(() => res.sendStatus(status.OK))
    .catch(err => res.status(status.BAD_REQUEST).send(err));
}

module.exports = { fetch, create, update, remove };
