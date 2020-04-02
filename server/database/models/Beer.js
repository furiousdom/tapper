module.exports = (sequelize, DataTypes) => {
  const Beer = sequelize.define('Beer', {
    brand: DataTypes.STRING,
    liters: DataTypes.INTEGER
  });

  Beer.associate = (models) => {
    Beer.belongsTo(models.Product, { foreignKey: 'beerFk' });
  };

  return Beer;
};
