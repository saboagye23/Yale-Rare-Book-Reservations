
// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Book model (table) by extending off Sequelize's Model class
class Book extends Model {}

// set up fields and rules for Book model
Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
          isUrl: true,
        }
      },
      image_link: {
        type: DataTypes.STRING,
        allowNull: true
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100,
        Validate: {
          isNumeric: true
        }
      },
      published_date:{
        type: DataTypes.DATE,
        allowNull: true
      },
      author:{
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      timestamps: true,
      createdAt: true, 
      updatedAt: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'book',
    }
  );
  
  module.exports = Book;