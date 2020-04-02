module.exports = (sequelize, DataTypes) => {
  const Beer = sequelize.define('Beer', {
    brand: DataTypes.STRING,
    availableLiters: DataTypes.INTEGER
  });

  Beer.associate = (models) => {
    Beer.belongsTo(models.Product, { foreignKey: 'beerFk' });
  };

  return Beer;
};
