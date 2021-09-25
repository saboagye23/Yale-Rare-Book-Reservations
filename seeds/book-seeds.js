const { Book } = require('../models');

const bookData = [];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;