const PRODUCT_TYPES = ['KEG', 'BOTTLES'];

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    type: DataTypes.ENUM(PRODUCT_TYPES[0], PRODUCT_TYPES[1]),
    liters: DataTypes.INTEGER
  });

  Product.associate = (models) => {
    Product.belongsToMany(models.Order, { through: models.ProductOrder });
    Product.hasMany(models.ProductOrder);
    Product.hasMany(models.Beer, { foreignKey: 'beerFk' });
  };

  return Product;
};
