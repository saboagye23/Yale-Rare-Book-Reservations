   
require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.BR_DB_NAME, process.env.BR_DB_USER, process.env.BR_DB_PW, {
    host: process.env.BR_DB_HOST | 'localhost',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
    decimalNumbers: true,
    },
});

module.exports = sequelize;