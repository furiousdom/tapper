const { Model } = require('sequelize');
const { ProductType } = require('../../common/config');
const values = require('lodash/values');

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
      packageVolume: {
        type: FLOAT,
        field: 'package_volume'
      },
      packageType: {
        type: ENUM(values(ProductType)),
        field: 'package_type'
      },
      brand: STRING,
      availableQuantity: {
        type: INTEGER,
        field: 'available_quantity'
      }
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
