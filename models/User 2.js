
// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize User model (table) by extending off Sequelize's Model class
class User extends Model {}

// set up fields and rules for Book model
User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate:{
          isEmail: true
        },
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
          min: 8,
          notNull: true
        }
      }
    },
    {
      sequelize,
      timestamps: true,
      createdAt: true, 
      updatedAt: true,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  
  module.exports = User;