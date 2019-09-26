"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      date_of_birth: DataTypes.DATEONLY,
      role_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      cellphone: DataTypes.INTEGER
    },
    {
      freezeTableName: true // Model tableName will be the same as the model name
    }
  );
  user.associate = function(models) {
    user.belongsTo(models.role_enum, {
      foreignKey: "role_id"
    });
  };
  return user;
};
