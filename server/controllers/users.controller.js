module.exports = {
  register(req, res) {
    res.send({
      message: `hello user: ${req.body.email}`
    });
  }
};
