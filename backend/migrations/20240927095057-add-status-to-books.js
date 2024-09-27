module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('books', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Want to Read'
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('books', 'status');
  }
};
