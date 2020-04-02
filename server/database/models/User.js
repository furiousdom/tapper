const bcrypt = require('bcryptjs');

const SALT = bcrypt.genSaltSync(10);
const encrypt = password => bcrypt.hash(password, SALT);

function encryptPassword(user) {
  return encrypt(user.password)
    .then(hash => user.setDataValue('password', hash));
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('OldUser', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: encryptPassword
    }
  });

  User.associate = (models) => {
    User.belongsTo(models.Order, { foreignKey: 'userFk' });
  };

  User.prototype.authenticate = function (password) {
    return bcrypt.compare(password, this.password)
      .then(isMatch => isMatch ? this : false);
  };

  return User;
};
