"use strict";
module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    "table",
    {
      status: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER
    },
    {
      freezeTableName: true // Model tableName will be the same as the model name
    }
  );
  table.associate = function(models) {
    // associations can be defined here
    table.belongsTo(models.order, {
      foreignKey: "order_id",
      as: "currentOrder"
    });
  };
  return table;
};
