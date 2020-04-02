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
  }
};
