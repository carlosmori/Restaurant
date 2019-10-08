"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "order_product",
      [
        {
          order_id: 1,
          product_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: 1,
          product_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: 2,
          product_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: 2,
          product_id: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: 2,
          product_id: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: 2,
          product_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("order_product", null, {});
  }
};
