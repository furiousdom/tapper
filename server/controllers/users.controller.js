const { OldUser } = require('../database');

module.exports = {
  async register(req, res) {
    try {
      const user = await OldUser.create(req.body);
      res.send(user.toJSON());
    } catch (err) {
      res.status(400).send({
        error: 'This account is already in use.'
      });
    }
  },
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await OldUser.findOne({ where: { username } });
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        });
      }
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect.'
        });
      }
      const userJson = user.toJSON();

      res.send({ user: userJson });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in.'
      });
    }
  }
};
