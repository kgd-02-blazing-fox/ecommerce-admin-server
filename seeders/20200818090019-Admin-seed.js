'use strict';

const bcrypt = require("bcryptjs")

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Users', [{
    name: 'admin',
    email: 'admin@mail.com',
    password: "1234",
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
