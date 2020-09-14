'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '$2y$05$HZE32QUXUr57kJCKTPfHquSGuglo53ys.9cJj06hAZOgOhc5DOXyu',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
