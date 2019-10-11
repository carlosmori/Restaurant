"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // return queryInterface.bulkInsert("order", [], {});
    return Promise.resolve();
  },

  down: (queryInterface, Sequelize) => {
    //return queryInterface.bulkDelete("order", null, {});
    return Promise.resolve();
  }
};
