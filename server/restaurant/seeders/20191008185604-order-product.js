"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // return queryInterface.bulkInsert("order_product", [], {});
    return Promise.resolve();
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete("order_product", null, {});
    return Promise.resolve();

  }
};
