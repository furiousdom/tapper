module.exports = (sequelize, DataTypes) => {
  const ProductOrder = sequelize.define('ProductOrder', {
    quantity: DataTypes.INTEGER
  });

  ProductOrder.associate = (models) => {
    ProductOrder.belongsTo(models.Product);
    ProductOrder.belongsTo(models.Order);
  };

  return ProductOrder;
};
