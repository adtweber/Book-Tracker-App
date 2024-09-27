'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_books', 'createdAt');
    await queryInterface.removeColumn('user_books', 'updatedAt');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_books', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('user_books', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
  }
};
