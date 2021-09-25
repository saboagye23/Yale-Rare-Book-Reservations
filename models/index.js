// import models
const Book = require('./Book');
const User = require('./User');
const Reservation = require('./Reservation');

// Reservation belongsTo User
Reservation.belongsTo(User, {
  foreignKey: 'user_id',
});

// Books have many Reservations
Book.hasMany(Reservation, {
  foreignKey: 'book_id',
});

// Reservation belongTo Book
Reservation.belongsTo(Book, {
  foreignKey: 'book_id',
});

module.exports = {
    Book,
    Reservation,
    User
};