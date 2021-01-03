const PRODUCT_TYPES = ['KEG', 'BOTTLES'];

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
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
    type: DataTypes.ENUM(PRODUCT_TYPES),
    liters: DataTypes.INTEGER
  });

  Product.associate = models => {
    Product.belongsToMany(models.Order, {
      through: models.ProductOrder,
      foreignKey: { name: 'productId', field: 'product_id' }
    });
    Product.hasMany(models.ProductOrder, {
      foreignKey: { name: 'productId', field: 'product_id' }
    });
    Product.belongsTo(models.Brand, {
      as: 'brand',
      foreignKey: { name: 'brandId', field: 'brand_id' }
    });
  };

  return Product;
};
