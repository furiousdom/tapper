const { Model } = require('sequelize');

class Order extends Model {
  static fields({ BOOLEAN, DATE }) {
    return {
      delivered: BOOLEAN,
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

  associate({ Product, ProductOrder, User }) {
    this.belongsToMany(Product, {
      through: ProductOrder,
      foreignKey: { name: 'orderId', field: 'order_id' }
    });
    this.hasMany(ProductOrder, {
      as: 'products',
      foreignKey: { name: 'orderId', field: 'order_id' }
    });
    this.belongsTo(User, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });
  }
}

module.exports = Order;
