const { Model } = require('sequelize');
const STATUS = ['OPEN', 'REVIEWED', 'CLOSED'];

class Order extends Model {
  static fields({ DATE, ENUM, TEXT }) {
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
      status: ENUM(STATUS),
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

  static scopes({ ProductOrder, Product }) {
    // TODO: If you rename quantity to availableQuantity on product model
    // you can unify all the excludes into a single array up here!
    const timestamps = ['createdAt', 'updatedAt', 'deletedAt'];
    return {
      includeEverything: {
        include: {
          model: ProductOrder,
          attributes: {
            exclude: ['orderId', 'productId', ...timestamps]
          },
          include: {
            model: Product,
            attributes: {
              exclude: ['quantity', ...timestamps]
            }
          }
        },
        attributes: {
          exclude: ['userId']
        }
      }
    };
  }
}

module.exports = Order;
