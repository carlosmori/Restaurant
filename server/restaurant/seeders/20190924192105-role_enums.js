"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "role_enum",
      [
        {
          description: "Admin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Waitress",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Waiter",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Chef",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("role_enum", null, {});
  }
};
