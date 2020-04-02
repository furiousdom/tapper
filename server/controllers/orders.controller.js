const { Order } = require('../database');

module.exports = {
  fetch(req, res) {
    try {
      console.log(Order);
      console.log('This is not implemented');
      res.status(400).send();
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in.'
      });
    }
  }
};
