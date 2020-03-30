module.exports = (sequelize, DataTypes) =>
  sequelize.define('OldUser', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  });
