module.exports = (sequelize, _) => {
  const Product = sequelize.define('Product', {});

  Product.associate = (models) => {
    Product.hasMany(models.ProductName, { foreignKey: 'productNameFk' });
    Product.hasMany(models.Packaging, { foreignKey: 'packagingFk' });
    Product.belongsToMany(models.Order, { through: models.OrderedProducts });
    Product.hasMany(models.OrderedProducts);
  };

  return Product;
};
