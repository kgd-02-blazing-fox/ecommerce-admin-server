'use strict';

const seed = require("../seed/seedproducts.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    seed.map(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
      await queryInterface.bulkInsert('Products', seed, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
