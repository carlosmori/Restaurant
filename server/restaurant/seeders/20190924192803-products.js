"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "product",
      [
        {
          description: "Hamburguer",
          price: 5.25,
          cook_time_minutes: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Fried sticks",
          price: 3.45,
          cook_time_minutes: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Tomatoe Soup",
          price: 7.0,
          cook_time_minutes: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Garlic bread",
          price: 2.75,
          cook_time_minutes: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: "Italian Pasta",
          price: 10.8,
          cook_time_minutes: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("product", null, {});
  }
};
