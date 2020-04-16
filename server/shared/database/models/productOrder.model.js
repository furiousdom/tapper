module.exports = (sequelize, DataTypes) => {
  const ProductOrder = sequelize.define('ProductOrder', {
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
    quantity: DataTypes.INTEGER
  });

  ProductOrder.associate = models => {
    ProductOrder.belongsTo(models.Product, { foreignKey: { name: 'productId', field: 'product_id' } });
    ProductOrder.belongsTo(models.Order, { foreignKey: { name: 'orderId', field: 'order_id' } });
  };

  return ProductOrder;
};
