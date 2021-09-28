
const router = require('express').Router();
const { Book } = require('../../models');

router.get('/', (req, res)=>{
    Book.findAll({
        attributes: ['id', 'title', 'description', 'url', 'image_link', 'author', 'published_date']
    })
    .then(bookData => {
        books = [];
        bookData.forEach(book =>{
            books.push(book.dataValues);
        });

        res.render('index', {
            books: books
        });
    })
    .catch(err => {
        console.log(err);
        res.render('index', {
            error: 'Oops! too bad something went wrong :). Try again',
            exception: err
        })
    });
});

router.get('/search', (req, res)=>{
    
    res.render('index', {
        searchTerm: req.query.q,
        books: []
    });
});

router.get('/login', (req, res)=>{
    res.render('login', {
        
    });
});

module.exports = router;