const router = require('express').Router();
const axios = require('axios');
const moment = require('moment');
const { or } = require('sequelize').Op;
const QueryHelper = require('../../helper');
const { Reservation, Book } = require('../../models');
const GOOGLE_BOOK_API = 'https://www.googleapis.com/books/v1/volumes/'

router.get('/', async (req, res) => {
    if (req.session.viewer === undefined){
        req.session.message = 'Login to reserve books';
        res.redirect('/'); 
    }else if(req.query.id){
        const reservedBooks = await QueryHelper.get_reserved_books(req);
        Book.findOne({
            where: {
                id: req.query.id
            },
            attributes: ['id', 'title', 'description', 'url', 'image_link', 'author', 'published_date', 'search_id']
        })
        .then(bookData => {
            const b = bookData.dataValues
            req.session.reserve_book = b
            res.render('reservation', {
                calendarYaer: new Date().getFullYear(),
                book: b,
                reservedBooks: reservedBooks,
                viewer: req.session.viewer
            });
        })
        .catch(err => {
            console.log(err);
            res.render('index', {
                reservedBooks: reservedBooks,
                error: 'Oops! Could not fin your book :). Try again',
                exception: err
            });
        });
    }else if(req.query.q){
        axios.get(GOOGLE_BOOK_API + req.query.q).then(response=>{ 
            const b = response.data; 
            book = {
                id: req.query.id,
                search_id: req.query.q,
                title: b.volumeInfo.title,
                description: b.volumeInfo.description,
                image_link: b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail: '',
                url: b.volumeInfo.infoLink,
                published_date: b.volumeInfo.publihedDate,
                is_search: true
            }

            req.session.reserve_book = book

            res.render('reservation', {
                calendarYaer: new Date().getFullYear(),
                book: book,
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
    }
});

router.post('/add-book', async (req, res) =>{
    if (req.session.viewer === undefined){
        req.session.message = 'Login to reserve books';
        res.redirect('/'); 
        return;
    }

    const reserve_book = req.session.reserve_book || {};
    const {notes, date} = req.body
    if(reserve_book.title !== null){
        // searched book in session
        const reserve_date = new Date(date);
        const current_date = new Date();
        moment().isAfter(reserve_date, current_date);

        if(moment().isSameOrAfter(current_date, reserve_date)){

           reserve_book.id = reserve_book.id || null;
           reserve_book.search_id = reserve_book.search_id || null;

           Book.findOrCreate({
               where: {
                   [or]: {
                    id: reserve_book.id, 
                    search_id: reserve_book.search_id
                   }
                },
               fields: ['title', 'description', 'url', 'image_link', 'search_id'],
               defaults: {
                   title: reserve_book.title,
                   description: reserve_book.description,
                   url: reserve_book.url,
                   image_link: reserve_book.image_link,
                   search_id: reserve_book.search_id
               }
            }).then(bookData => { 
                
                let found_book = bookData[0].dataValues;  
                Reservation.create({
                    book_id: found_book.id,
                    user_id: req.session.viewer.id,
                    start_date : reserve_date,
                    end_date : reserve_date
                }).then(reservationData=>{
                    req.session.message =`New reserved book ${reserve_book.title} on ${reserve_date}`;
                    req.session.reserve_book = undefined
                    res.redirect('/');
                }).catch(err=>{
                    console.error(err);
                }); 
                
            }).catch( async (err)=>{
                console.error(err);
                const reservedBooks = await QueryHelper.get_reserved_books(req);
                res.render('reservation', {
                    calendarYaer: new Date().getFullYear(),
                    book: reserve_book,
                    reservedBooks: reservedBooks,
                    viewer: req.session.viewer,
                    error: 'Oops! Could not create book :). Try again'
                });
            });
            
            return;
        }
    }

    // no books found to reserve, return to index page for user to select a book
    req.session.message = 'Invalid reservation date or book not found';
    res.redirect(`/reservations?id=${reserve_book.id}id&search_id=${reserve_book.search_id}`);
});

module.exports = router;