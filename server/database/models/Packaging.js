module.exports = (sequelize, DataTypes) => {
  const Packaging = sequelize.define('Packaging', {
    liters: DataTypes.INTEGER
  });

  Packaging.associate = (models) => {
    Packaging.hasMany(models.PackageType, { foreignKey: 'packageTypeFk' });
    Packaging.belongsTo(models.Product, { foreignKey: 'packagingFk' });
  };

  return Packaging;
};
