'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.createTable('books', {
    //   bookId: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //   },
    //   title: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   cover: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   status: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     defaultValue: 'Want to Read',
    //   },
    //   author: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   userId: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'users',   // This refers to the users table
    //       key: 'userId',
    //     },
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE',
    //   }
    // });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
  }
};
