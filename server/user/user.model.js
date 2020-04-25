const bcrypt = require('bcryptjs');
const PRODUCT_TYPES = ['USER', 'ADMIN'];

const SALT = bcrypt.genSaltSync(10);
const encrypt = password => bcrypt.hash(password, SALT);

function encryptPassword(user) {
  return encrypt(user.password)
    .then(hash => user.setDataValue('password', hash));
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: 'deleted_at'
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.ENUM(PRODUCT_TYPES),
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    contactName: {
      type: DataTypes.STRING,
      field: 'contact_name'
    },
    contactNumber: {
      type: DataTypes.STRING,
      field: 'contact_number'
    }
  }, {
    hooks: {
      beforeCreate: encryptPassword
    }
  });

  User.associate = models => {
    User.hasMany(models.Order, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });
  };

  User.prototype.authenticate = function (password) {
    return bcrypt.compare(password, this.password)
      .then(isMatch => isMatch ? this : false);
  };

  return User;
};
