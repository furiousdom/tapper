const { Model } = require('sequelize');

class Order extends Model {
  static fields({ BOOLEAN, DATE, TEXT }) {
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
      delivered: BOOLEAN,
      note: TEXT
    };
  }

  static associate({ Product, ProductOrder, User }) {
    this.belongsToMany(Product, {
      through: ProductOrder,
      foreignKey: { name: 'orderId', field: 'order_id' }
    });
    this.hasMany(ProductOrder, {
      foreignKey: { name: 'orderId', field: 'order_id' }
    });
    this.belongsTo(User, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });
  }
}

module.exports = Order;
