const router = require('express').Router();
const bookRoutes = require('./book-routes');
const userRoutes = require('./user-routes');
const reservationRoutes = require('./reservation-routes');

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/reservations', reservationRoutes);

module.exports = router;