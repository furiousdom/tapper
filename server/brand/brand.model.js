const { Model } = require('sequelize');

class Brand extends Model {
  static fields({ DATE, INTEGER, STRING }) {
    return {
      name: STRING,
      availableLiters: {
        type: INTEGER,
        field: 'available_liters'
      },
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

  static associate({ Product }) {
    this.hasMany(Product, {
      foreignKey: { name: 'brandId', field: 'brand_id' }
    });
  }
}

module.exports = Brand;
