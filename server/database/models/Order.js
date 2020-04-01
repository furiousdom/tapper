module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    date: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  });

  Order.associate = (models) => {
    Order.hasMany(models.User, { foreignKey: 'UserFk' });
  };

  return Order;
};
