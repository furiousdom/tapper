const { Order, Product, ProductOrder } = require('../database');

function fetch({ query: { userId } }, res) {
  Order.findAll({
    where: { userId },
    include: {
      model: ProductOrder,
      include: Product
    }
  })
    .then(orders => res.send(orders))
    .catch(err => res.status(400).send(err));
}

function create({ body: { userId, products } }, res) {
  return Order.create({ date: new Date(), status: false, userId })
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
    .then(() => res.sendStatus(200))
    .catch(err => res.status(400).send(err));
}

function update(req, res) {
  const { params: { id }, body: { status, products } } = req;
  return Order.findByPk(id, { include: ProductOrder })
    .then(async order => {
      await order.update({ status });
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
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err));
}

function remove({ params: { id } }, res) {
  return Order.findByPk(id, { include: ProductOrder })
    .then(order => {
      ProductOrder.destroy({ where: { orderId: order.id } })
        .then(() => order.destroy());
    })
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err));
}

module.exports = { fetch, create, update, remove };
