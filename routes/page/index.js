
const router = require('express').Router();
const accountRoutes = require('./account-routes');
const homeRoutes = require('./home-routes');
const reservationRoutes = require('./reservation-routes');

router.use('/', homeRoutes)
router.use('/account', accountRoutes)
router.use('/reservation', reservationRoutes)

module.exports = router;