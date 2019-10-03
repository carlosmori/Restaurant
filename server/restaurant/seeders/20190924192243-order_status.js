"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "order_status",
      [
        {
          description: "Ready to be cooked",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Preparing",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Ready to dispatch",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Delivered",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("order_status", null, {});
  }
};
