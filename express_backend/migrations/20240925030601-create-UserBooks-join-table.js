'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('use_books', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'userId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'books', 
          key: 'bookID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_books');
  }
};
