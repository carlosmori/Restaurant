"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "order",
      [
        {
          user_id: 2,
          status: 1,
          amount: 15,
          deliver_time: "2019-01-20",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 2,
          status: 1,
          amount: 40,
          deliver_time: "2019-02-20",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 2,
          status: 4,
          amount: 30,
          deliver_time: "2019-03-20",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 3,
          status: 4,
          amount: 25,
          deliver_time: "2019-04-20",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 3,
          status: 4,
          amount: 10,
          deliver_time: "2019-05-20",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 3,
          status: 4,
          amount: 40,
          deliver_time: "2019-06-20",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 3,
          status: 4,
          amount: 45,
          deliver_time: "2019-07-20",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 3,
          status: 4,
          amount: 12,
          deliver_time: "2019-08-20",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("order", null, {});
  }
};
