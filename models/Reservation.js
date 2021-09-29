
// import important parts of sequelize library
const { Model, DataTypes, Sequelize } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Reservation model (table) by extending off Sequelize's Model class
class Reservation extends Model {}

// set up fields and rules for Book model
Reservation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'book',
          key: 'id'
        }
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.DATEONLY,
        validate:{
          isAfter: Sequelize.fn('DATEONLY')
        }
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
          isAfter: Sequelize.fn('DATEONLY')
        }
      },
      notes: {
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
      modelName: 'reservation',  
    }
  );
  
  module.exports = Reservation;