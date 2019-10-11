"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "table",
      [
        {
          status: 1,
          order_id: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 1,
          order_id: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 1,
          order_id: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          status: 1,
          order_id: null,
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
