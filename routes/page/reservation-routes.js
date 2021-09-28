const router = require('express').Router();
const axios = require('axios');
const { Reservation, Book } = require('../../models');
const GOOGLE_BOOK_API = 'https://www.googleapis.com/books/v1/volumes/'

router.get('/', (req, res) => {
    if (req.session.viewer === undefined){
        res.redirect('/'); 
    }else if(req.query.id){
        Book.findOne({
            where: {
                id: req.query.id
            },
            attributes: ['id', 'title', 'description', 'url', 'image_link', 'author', 'published_date']
        })
        .then(bookData => {
            const b = bookData.dataValues
            req.session.book = {
                db: b
            }
            res.render('index', {
                calendarYaer: new Date().getFullYear(),
                book: b,
                reservedBooks: []
            });
        })
        .catch(err => {
            console.log(err);
            res.render('reservation', {
                error: 'Oops! Could not fin your book :). Try again',
                exception: err
            });
        });
    }else if(req.query.q){
        axios.get(GOOGLE_BOOK_API + req.query.q).then(response=>{ 
            const b= response.data;
            req.session.book = {
                google: b
            }
            book={
                id: null,
                search_id: b.id,
                title: b.volumeInfo.title,
                description: b.volumeInfo.description,
                image_link: b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail: '',
                url: b.volumeInfo.infoLink,
                published_date: b.volumeInfo.publihedDate
            }
           
            res.render('reservation', {
                calendarYaer: new Date().getFullYear(),
                book: book,
                reservedBooks: []
            });
        }).catch(err => {
            console.log(err);
            res.render('index', {
                error: 'Oops! Could not fin your book :). Try again',
                exception: err
            })
        });
    }
});

module.exports = router;