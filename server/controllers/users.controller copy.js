const { Order } = require('../database');

module.exports = {
  async login(req, res) {
    try {

    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in.'
      });
    }
  }
};
