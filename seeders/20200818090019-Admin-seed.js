'use strict';

const bcrypt = require("bcryptjs")


module.exports = {
  up: async (queryInterface, Sequelize) => {
  const salt = bcrypt.genSaltSync(5)
   await queryInterface.bulkInsert('Users', [{
    name: 'admin',
    email: 'admin@mail.com',
    password: bcrypt.hashSync("1234",salt),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
