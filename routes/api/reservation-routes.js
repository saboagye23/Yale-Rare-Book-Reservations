const router = require('express').Router();
const { Reservation, Book, User } = require('../../models');

// The `/api/v1/reservations` endpoint

// get all reservations
router.get('/', (req, res) => {
    // find all reservations
    Reservation.findAll({
      attributes: ['id', 'color', 'start_date', 'end_date'],
      include:[
          {
              model: Book,
              attributes: ['id', 'title', 'description', 'url', 'image_link', 'author']
          },{
              model: User,
              attributes:['id', 'full_name']
          }
      ]
    })
    .then(reservationData => res.json(reservationData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all user reservations
router.get('/user', (req, res) => {
    if(!req.session.viewer){
        console.log('No login user found');
        res.status(401).json({message: 'Login before reserving a book'});
        return;
    }

    Reservation.findAll({
      where:{
        user_id: req.session.viewer.id
      },  
      attributes: ['id', 'color', 'start_date', 'end_date'],
      include:[
          {
              model: Book,
              attributes: ['id', 'title', 'description', 'url', 'image_link', 'author']
          },{
              model: User,
              attributes:['id', 'full_name']
          }
      ]
    })
    .then(reservationData => res.json(reservationData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// reserve a book for a user
/**
    {
        book_id: 1,
        user_id: 1,
        color: '#fff',
        start_date: '',
        end_date: ''
    }
 */
router.post('/', (req, res) => {
    if(!req.session.viewer){
        console.log('No login user found');
        res.status(401).json({message: 'Login before reserving a book'});
        return;
    }

    req.body.user_id=req.session.viewer.id

    Reservation.create(req.body)
    .then(reservationData => res.json(reservationData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;