module.exports = (sequelize, DataTypes) => {
  const PackageType = sequelize.define('PackageType', {
    type: DataTypes.STRING
  });

  PackageType.associate = (models) => {
    PackageType.belongsTo(models.Packaging, { foreignKey: 'packageTypeFk' });
  };

  return PackageType;
};
