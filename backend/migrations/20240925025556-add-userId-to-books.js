'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the 'userId' column to the 'books' table
    await queryInterface.addColumn('books', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',  // Refers to the 'users' table
        key: 'userId'    // Refers to the 'userId' column in 'users' table
      },
      onDelete: 'CASCADE',  // Deletes books if the associated user is deleted
      onUpdate: 'CASCADE'   // Updates the foreign key if the userId is updated
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'userId' column if we need to undo this migration
    await queryInterface.removeColumn('books', 'userId');
  }
};
