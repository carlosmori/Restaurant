'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_status = sequelize.define('order_status', {
    description: DataTypes.STRING
  }, {});
  order_status.associate = function(models) {
    // associations can be defined here
  };
  return order_status;
};