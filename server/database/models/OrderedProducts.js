module.exports = (sequelize, DataTypes) => {
  const OrderedProducts = sequelize.define('OrderedProducts', {
    quantity: DataTypes.INTEGER
  });

  OrderedProducts.associate = (models) => {
    OrderedProducts.belongsTo(models.Product);
    OrderedProducts.belongsTo(models.Order);
  };

  return OrderedProducts;
};
