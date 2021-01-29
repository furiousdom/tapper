const { Model } = require('sequelize');
const PRODUCT_TYPES = ['KEG', 'BOTTLES'];

class Product extends Model {
  static fields({ DATE, ENUM, FLOAT, INTEGER, STRING }) {
    return {
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
      },
      volume: FLOAT, // TODO: Rename to pacakgeVolume
      type: ENUM(PRODUCT_TYPES), // Rename to packageType
      brand: STRING, // Rename to brandName?
      quantity: INTEGER // Rename to availableQuantity
    };
  }

  static associate({ Order, ProductOrder }) {
    this.belongsToMany(Order, {
      through: ProductOrder,
      foreignKey: { name: 'productId', field: 'product_id' }
    });
    this.hasMany(ProductOrder, {
      foreignKey: { name: 'productId', field: 'product_id' }
    });
  }
}

module.exports = Product;
