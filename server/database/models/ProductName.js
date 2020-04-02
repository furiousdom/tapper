module.exports = (sequelize, DataTypes) => {
  const ProductName = sequelize.define('ProductName', {
    name: DataTypes.STRING
  });

  ProductName.associate = (models) => {
    ProductName.belongsTo(models.Product, { foreignKey: 'productNameFk' });
  };

  return ProductName;
};
