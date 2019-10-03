"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      user_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      deliver_time: DataTypes.DATE
    },
    {
      freezeTableName: true // Model tableName will be the same as the model name
    }
  );
  order.associate = function(models) {
    // associations can be defined here
    order.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "waiterWaitress"
    });
    order.belongsToMany(models.product, { through: "order_product", foreignKey: 'order_id'});
  };
  return order;
};
