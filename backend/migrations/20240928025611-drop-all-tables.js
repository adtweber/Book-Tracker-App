'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('use_books');
    await queryInterface.dropTable('books');
    await queryInterface.dropTable('users');
  },
  down: async (queryInterface, Sequelize) => {
    // You can optionally add code to recreate the tables here if needed
  }
};
