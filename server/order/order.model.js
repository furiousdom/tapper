module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
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
    date: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  });

  Order.associate = models => {
    Order.belongsToMany(models.Product, { through: models.ProductOrder, foreignKey: { name: 'orderId', field: 'order_id' } });
    Order.hasMany(models.ProductOrder, { foreignKey: { name: 'orderId', field: 'order_id' } });
    Order.belongsTo(models.User, { foreignKey: { name: 'userId', field: 'user_id' } });
  };

  return Order;
};
