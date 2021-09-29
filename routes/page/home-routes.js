const router = require('express').Router();
const axios = require('axios');
const QueryHelper = require('../../helper');
const { Book, Reservation, User } = require('../../models');
const GOOGLE_BOOK_API = 'https://www.googleapis.com/books/v1/volumes?q='

router.get('/', async (req, res)=>{
    const message = req.session.message || ''
    req.session.message = undefined
    const reservedBooks = await QueryHelper.get_reserved_books(req);
    Book.findAll({
        attributes: ['id', 'title', 'description', 'url', 'image_link', 'search_id', 'author', 'published_date']
    })
    .then(bookData=> {
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
            reservedBooks: reservedBooks,
            viewer: req.session.viewer,
            message: message
        });
    })
    .catch(err => {
        console.log(err);
        res.render('index', {
            reservedBooks: reservedBooks,
            error: 'Oops! too bad something went wrong :). Try again',
            exception: err
        })
    });
});

router.get('/search', async (req, res)=>{
    const q = req.query.q
    if (q== undefined || q.trim() === ''){
        res.render('index', {
            message: 'Enter a book title or description to search'
        });
    }
    const reservedBooks = await QueryHelper.get_reserved_books(req);

    axios.get(GOOGLE_BOOK_API + q).then(response=>{ 
        books=[];
        response.data.items.forEach(b=>{
            books.push({
                id: null,
                search_id: b.id,
                title: b.volumeInfo.title,
                description: b.volumeInfo.description,
                image_link: b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail: '',
                url: b.volumeInfo.infoLink || b.volumeInfo.canonicalVolumeLink,
                published_date: b.volumeInfo.publihedDate,
                showReserve:true
            })
        })
       
        res.render('index', {
            searchTerm: q,
            books: books,
            showReserve: 'true',
            reservedBooks: reservedBooks,
            viewer: req.session.viewer
        });
    }).catch(err => {
        console.log(err);
        res.render('index', {
            reservedBooks: reservedBooks,
            error: 'Oops! Could not fin your book :). Try again',
            exception: err
        });
    });
});
module.exports = router;