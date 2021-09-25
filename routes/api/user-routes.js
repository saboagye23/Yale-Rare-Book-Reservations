const router = require('express').Router();
const bcrypt = require('bcrypt'); 
const { User, Reservation, Book } = require('../../models');
const saltRounds = 10;

// The `/api/v1/users` endpoint

// User login  
router.post('/login', (req, res) => {
    // login user
    User.findOne({
        where: {
            email: req.body.email
        },
        attributes: ['id', 'email', 'full_name', 'password_hash']
    })
    .then(userData => {
        bcrypt.compare(req.body.password, userData.password_hash, function(err, result) {
            if (result == true){
                req.session.viewer = userData
                res.json({ id: userData.id, full_name: userData.full_name, email:userData.email })
            } else {
                res.status(401).json({message: 'Provide valid email and passowrd', exception: err})
            }
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// User Logout  
router.get('/logout', (req, res) => {
    // login user
    req.session.regenerate(function(err) {
        // will have a new session here
        res.status(200).json({message:'User logout!'});
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a user
router.post('/', (req, res) => { 
    bcrypt.hash(req.body.password, saltRounds, function(err, password_hash) { 

        // Store hash in your password DB.
        User.create({
            email: req.body.email,
            password_hash: password_hash,
            full_name: req.body.full_name
        })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
});

// create a book
router.put('/:id', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  User.update({full_name: req.body.full_name}, {
    where:{
      id: req.params.id
    }
  })
  .then(userData => res.json(userData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;