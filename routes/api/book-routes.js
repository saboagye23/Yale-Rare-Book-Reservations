const router = require('express').Router();
const { Book } = require('../../models');

// The `/api/v1/books` endpoint

// get all books
router.get('/', (req, res) => {
    // find all books
    Book.findAll({
      attributes: ['id', 'title', 'description', 'url', 'image_link', 'search_id', 'author', 'published_date']
    })
    .then(bookData => res.json(bookData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one book
router.get('/:id', (req, res) => {
    // find one book 
    Book.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'description', 'url', 'image_link', 'search_id', 'author', 'published_date']
    })
    .then(bookData => res.json(bookData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a book
router.post('/', (req, res) => { 
    Book.create(req.body)
    .then(bookData => res.json(bookData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a book
router.put('/:id', (req, res) => { 
  Book.update(req.body, {
    where:{
      id: req.params.id
    }
  })
  .then(bookData => res.json(bookData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;