module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    date: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  });

  Order.associate = (models) => {
    Order.hasMany(models.User, { foreignKey: 'userFk' });
    Order.belongsToMany(models.Product, { through: models.OrderedProducts });
    Order.hasMany(models.OrderedProducts);
  };

  return Order;
};
