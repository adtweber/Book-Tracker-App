'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,   
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    timestamps: false  
  });

  return Book;
};