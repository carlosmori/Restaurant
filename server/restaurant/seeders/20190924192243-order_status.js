"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "order_status",
      [
        {
          description: "In the kitchen",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Ready",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Cancelled",
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
