// const bcrypt = require('bcryptjs');
// const SALT = bcrypt.genSaltSync(10);

module.exports = (sequelize, DataTypes) =>
  sequelize.define('User', {
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

// function authenticate(password) {
//   return bcrypt.compare(password, this.password)
//     .then(isMatch => isMatch ? this : false);
// }

// const encrypt = password => bcrypt.hash(password, SALT);

// async function encryptPassword() {
//   this.password = await encrypt(this.password);
//   return this.save();
// }
