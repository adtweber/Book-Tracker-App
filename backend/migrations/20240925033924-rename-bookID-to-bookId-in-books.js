'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('books', 'bookID', 'bookId');
  },

  down: async (queryInterface, Sequelize) => {
    // In the down function, reverse the operation if the migration is rolled back
    await queryInterface.renameColumn('books', 'bookId', 'bookID');
  }
};
