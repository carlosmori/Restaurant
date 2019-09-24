'use strict';
module.exports = (sequelize, DataTypes) => {
  const table_status = sequelize.define('table_status', {
    description: DataTypes.STRING
  }, {});
  table_status.associate = function(models) {
    // associations can be defined here
  };
  return table_status;
};