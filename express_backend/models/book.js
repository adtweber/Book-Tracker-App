'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate({ user, user_books }) {
      Book.belongsToMany(User, {
        through: 'userbooks', 
        foreignKey: 'bookId'
      });
      
    }
  }

  // Initialize the Book model with fields
  Book.init({
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {  // Foreign key to link Book to User
      type: DataTypes.INTEGER,
      references: {
        model: 'users',   // Refers to the User table
        key: 'userId'
      },
      onDelete: 'CASCADE', // If a user is deleted, their books are deleted too
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    timestamps: false
  });

  return Book;
};
