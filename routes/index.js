const router = require('express').Router();
const pageRoutes = require('./page');
const apiRoutes = require('./api');

// define page url routes within /page/index.js example
router.use('/', pageRoutes);

// api url prefix used by client to access backend servies 
router.use('/api/v1', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;