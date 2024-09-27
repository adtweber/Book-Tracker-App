'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserBooks = sequelize.define('UserBooks', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'userId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'books',
        key: 'bookId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'user_books',  
    timestamps: false
  });

  return UserBooks;
};
