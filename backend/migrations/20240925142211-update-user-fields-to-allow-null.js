'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: true  // Allow null for firstName
    });
    
    await queryInterface.changeColumn('users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: true  // Allow null for lastName
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false  // Revert to not allowing null for firstName
    });

    await queryInterface.changeColumn('users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false  // Revert to not allowing null for lastName
    });
  }
};
