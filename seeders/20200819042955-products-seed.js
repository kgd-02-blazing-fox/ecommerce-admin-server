'use strict';

let productSeed = require('../json-seed/products.json')
productSeed = productSeed.map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', productSeed, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
