"use strict";
module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    "table",
    {
      status: DataTypes.STRING,
      order_id: DataTypes.INTEGER
    },
    {}
  );
  table.associate = function(models) {
    // associations can be defined here
    table.belongsTo(models.order, {
      foreignKey: "order_id",
      as: "orders"
    });
  };
  return table;
};
