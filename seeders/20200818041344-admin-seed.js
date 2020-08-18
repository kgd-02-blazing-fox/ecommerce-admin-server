'use strict';
const { hashPassword } = require('../helpers/hashPassword')

let adminSeed =
  [
    {
      "email": "admin@mail.com",
      "password": hashPassword("1234"),
      "createdAt": new Date(),
      "updatedAt": new Date()
    },
    {
      "email": "admin2@mail.com",
      "password": hashPassword("1234"),
      "createdAt": new Date(),
      "updatedAt": new Date()
    }
  ]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Admins', adminSeed, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
