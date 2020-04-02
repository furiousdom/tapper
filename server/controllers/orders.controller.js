const { Order } = require('../database');

module.exports = {
  async fetch(req, res) {
    try {
      const orders = await Order.findAll();
      res.send(orders);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch all orders.'
      });
    }
  },
  async create(req, res) {
    try {
      const dbres = await Order.create({
        date: new Date(),
        status: req.body.status,
        user_id: req.body.userId
      });
      res.send(dbres);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create an order.'
      });
    }
  }
};
