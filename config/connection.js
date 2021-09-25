   
require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.BR_DB_NAME, process.env.BR_DB_USER, process.env.BR_DB_PW, {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
    decimalNumbers: true,
    },
});

module.exports = sequelize;