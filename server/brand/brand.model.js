module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
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
    name: DataTypes.STRING,
    availableLiters: {
      type: DataTypes.INTEGER,
      field: 'available_liters'
    }
  });

  Brand.associate = models => {
    Brand.hasMany(models.Product, { foreignKey: { name: 'brandId', field: 'brand_id' } });
  };

  return Brand;
};
