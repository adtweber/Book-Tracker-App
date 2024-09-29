'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_books', {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',   // References the users table
          key: 'userId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'books',   // References the books table
          key: 'bookId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_books');
  }
};
