"use strict";
module.exports = (sequelize, DataTypes) => {
  const order_product = sequelize.define(
    "order_product",
    {
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      dispatched: DataTypes.BOOLEAN
    },
    {
      freezeTableName: true // Model tableName will be the same as the model name
    }
  );
  order_product.associate = function(models) {
    // associations can be defined here
  };
  return order_product;
};
