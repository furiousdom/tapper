const bcrypt = require('bcryptjs');

const SALT = bcrypt.genSaltSync(10);
const encrypt = password => bcrypt.hash(password, SALT);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING
  });
  User.prototype.authenticate = function (password) {
    return bcrypt.compare(password, this.password)
      .then(isMatch => isMatch ? this : false);
  };
  User.prototype.encryptPassword = async function () {
    this.password = await encrypt(this.password);
    return this.save();
  };
  return User;
};
