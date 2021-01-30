const { auth } = require('../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
const pick = require('lodash/pick');
const { ROLES } = require('../config/shared');

const SALT = bcrypt.genSaltSync(auth.saltRounds);
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
      role: ENUM(ROLES),
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

  createToken(options = {}) {
    const payload = pick(this, ['id', 'email']);
    return jwt.sign(payload, auth.secret, options);
  }
}

module.exports = User;
