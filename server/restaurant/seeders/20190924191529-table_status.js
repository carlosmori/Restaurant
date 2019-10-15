"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "table_status",
      [
        {
          description: "Free",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Clients Waiting",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Clients Eating",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("table_status", null, {});
  }
};
