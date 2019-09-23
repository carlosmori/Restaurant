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
    {}
  );
  order.associate = function(models) {
    // associations can be defined here
    order.hasOne(models.user, {
      foreignKey: "user_id"
    });
    order.belongsToMany(models.product, { through: "order_product" });
  };
  return order;
};
