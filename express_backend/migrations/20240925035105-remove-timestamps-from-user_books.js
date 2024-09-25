'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove 'createdAt' and 'updatedAt' columns from 'user_books' table
    await queryInterface.removeColumn('user_books', 'createdAt');
    await queryInterface.removeColumn('user_books', 'updatedAt');
  },

  async down(queryInterface, Sequelize) {
    // In case of rollback, re-add 'createdAt' and 'updatedAt' columns
    await queryInterface.addColumn('user_books', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });

    await queryInterface.addColumn('user_books', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
  }
};
