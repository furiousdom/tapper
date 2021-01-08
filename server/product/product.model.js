const { Model } = require('sequelize');
const PRODUCT_TYPES = ['KEG', 'BOTTLES'];

class Product extends Model {
  static fields({ DATE, ENUM, INTEGER }) {
    return {
      type: ENUM(PRODUCT_TYPES),
      liters: INTEGER,
      createdAt: {
        type: DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DATE,
        field: 'updated_at'
      },
      deletedAt: {
        type: DATE,
        field: 'deleted_at'
      }
    };
  }

  static associate({ Brand, Order, ProductOrder }) {
    this.belongsToMany(Order, {
      through: ProductOrder,
      foreignKey: { name: 'productId', field: 'product_id' }
    });
    this.hasMany(ProductOrder, {
      foreignKey: { name: 'productId', field: 'product_id' }
    });
    this.belongsTo(Brand, {
      as: 'brand',
      foreignKey: { name: 'brandId', field: 'brand_id' }
    });
  }
}

module.exports = Product;
