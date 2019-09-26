"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "table",
      [
        {
          status: 1,
          order_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 1,
          order_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 1,
          order_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 1,
          order_id: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("table", null, {});
  }
};
