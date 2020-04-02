module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    date: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  });

  Order.associate = (models) => {
    Order.belongsToMany(models.Product, { through: models.ProductOrder });
    Order.hasMany(models.ProductOrder);
    Order.hasMany(models.User, { foreignKey: 'userFk' });
  };

  return Order;
};
