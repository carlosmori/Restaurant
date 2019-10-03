"use strict";
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      cook_time_minutes: DataTypes.INTEGER
    },
    {
      freezeTableName: true // Model tableName will be the same as the model name
    }
  );
  product.associate = function(models) {
    // associations can be defined here
    product.belongsToMany(models.order, {
      through: "order_product",
      foreignKey: "product_id"
    });
  };
  return product;
};
