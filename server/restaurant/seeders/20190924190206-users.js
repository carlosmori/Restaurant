"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "user",
      [
        {
          name: "Charly",
          last_name: "Mori",
          date_of_birth: "1994-11-25",
          role: 1,
          email: "carlosmori34@gmail.com",
          cellphone: 11304104912,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Megan",
          last_name: "Fox",
          date_of_birth: "1994-01-25",
          role: 2,
          email: "meganfox@gmail.com",
          cellphone: 11304104912,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Tom",
          last_name: "Hanks",
          date_of_birth: "1997-11-20",
          role: 3,
          email: "tomhanks@gmail.com",
          cellphone: 11304104912,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Gordon",
          last_name: "Ramsay",
          date_of_birth: "1986-11-20",
          role: 4,
          email: "gordonramsay@gmail.com",
          cellphone: 11304104912,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  }
};
