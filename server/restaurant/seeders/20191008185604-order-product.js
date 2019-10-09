"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "order_product",
      [
        {
          order_id: 1,
          product_id: 1,
          dispatched: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: 1,
          product_id: 2,
          dispatched: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: 2,
          product_id: 3,
          dispatched: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: 2,
          product_id: 4,
          dispatched: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: 2,
          product_id: 5,
          dispatched: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          order_id: 2,
          product_id: 2,
          dispatched: false,
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
