'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Book, UserBooks }) {
      User.belongsToMany(Book, {
        through: 'user_books',
        as: 'books',
        foreignKey: 'userId'
      });
    }
  }
  // Initialize the User model with fields
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,  // Keep this inside the init options
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });

  return User;
};
