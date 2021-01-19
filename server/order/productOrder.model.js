const { Model } = require('sequelize');

class ProductOrder extends Model {
  static fields({ DATE, INTEGER }) {
    return {
      quantity: INTEGER,
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

  static associate({ Order, Product }) {
    this.belongsTo(Product, {
      foreignKey: { name: 'productId', field: 'product_id' }
    });
    this.belongsTo(Order, {
      foreignKey: { name: 'orderId', field: 'order_id' }
    });
  }
}
module.exports = ProductOrder;
