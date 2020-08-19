'use strict';

const bcrypt = require("bcryptjs")

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Users', [{
    name: 'John Doe',
    email: 'johndoe@ecommerce.com',
    password: "123456",
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),   //tests does not need seeds
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
