const router = require('express').Router();
const axios = require('axios');
const { Book } = require('../../models');
const GOOGLE_BOOK_API = 'https://www.googleapis.com/books/v1/volumes?q='

router.get('/', (req, res)=>{
    Book.findAll({
        attributes: ['id', 'title', 'description', 'url', 'image_link', 'author', 'published_date']
    })
    .then(bookData => {
        books = [];
        bookData.forEach(book =>{
            books.push({
                ...book.dataValues,
                showReserve:true
            });
        });

        res.render('index', {
            books: books,
            showReserve: true,
            reservedBooks: []
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
    const q = req.query.q
    axios.get(GOOGLE_BOOK_API + q).then(response=>{ 
        books=[];
        response.data.items.forEach(b=>{
            books.push({
                id: null,
                search_id: b.id,
                title: b.volumeInfo.title,
                description: b.volumeInfo.description,
                image_link: b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail: '',
                url: b.volumeInfo.infoLink,
                published_date: b.volumeInfo.publihedDate,
                showReserve:true
            })
        })
       
        res.render('index', {
            searchTerm: q,
            books: books,
            showReserve: 'true',
            reservedBooks: []
        });
    }).catch(err => {
        console.log(err);
        res.render('index', {
            error: 'Oops! Could not fin your book :). Try again',
            exception: err
        })
    });
});
module.exports = router;