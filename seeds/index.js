const sequelize = require('../config/connection');
const seedBooks = require('./book-seeds');
const seedUsers = require('./user-seeds');
const seedReservations = require('./reservation-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedBooks();
  console.log('\n----- BOOKS SEEDED -----\n');
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');
  await seedReservations();
  console.log('\n----- RESERVATIONS SEEDED -----\n');
  process.exit(0);
}

seedAll();