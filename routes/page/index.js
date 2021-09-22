
const router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('index', {layout: false});
});

router.get('/login', (req, res)=>{
    res.render('login', {layout: false});
});

module.exports = router;