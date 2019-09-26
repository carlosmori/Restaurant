"use strict";
module.exports = (sequelize, DataTypes) => {
  const role_enum = sequelize.define(
    "role_enum",
    {
      description: DataTypes.STRING
    },
    {
      freezeTableName: true // Model tableName will be the same as the model name
    }
  );
  role_enum.associate = function(models) {
    // associations can be defined here
  };
  return role_enum;
};
