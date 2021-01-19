const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');
const PRODUCT_TYPES = ['USER', 'ADMIN'];

const SALT = bcrypt.genSaltSync(10);
const encrypt = password => bcrypt.hash(password, SALT);

function encryptPassword(user) {
  return encrypt(user.password)
    .then(hash => user.setDataValue('password', hash));
}

class User extends Model {
  static fields({ DATE, ENUM, STRING }) {
    return {
      email: {
        type: STRING,
        set(email) {
          this.setDataValue('email', email.toLowerCase());
        },
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: STRING,
      role: ENUM(PRODUCT_TYPES),
      name: STRING,
      address: STRING,
      contactName: {
        type: STRING,
        field: 'contact_name'
      },
      contactNumber: {
        type: STRING,
        field: 'contact_number'
      },
      createdAt: {
        type: DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DATE,
        field: 'updated_at'
      },
      deletedAt: {
        type: DATE,
        field: 'deleted_at'
      }
    };
  }

  static associate({ Order }) {
    this.hasMany(Order, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });
  }

  static hooks(Hooks) {
    return {
      [Hooks.beforeCreate](user) {
        return encryptPassword(user);
      }
    };
  }

  authenticate(password) {
    return bcrypt.compare(password, this.password)
      .then(isMatch => isMatch ? this : false);
  }
}

module.exports = User;
