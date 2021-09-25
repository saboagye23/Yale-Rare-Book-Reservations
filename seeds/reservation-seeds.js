const { Reservation } = require('../models');

const reservationData = [];

const seedReservations = () => Reservation.bulkCreate(reservationData);

module.exports = seedReservations;