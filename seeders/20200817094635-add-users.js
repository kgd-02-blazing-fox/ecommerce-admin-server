'use strict';
const { hashPassword } = require('../helpers/hashPassword')

let userSeed = require('../json-seed/users.json')
userSeed = userSeed.map((el) => {
  el.password = hashPassword(el.password)
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', userSeed, {individualHooks: true});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
