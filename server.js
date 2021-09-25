const express = require('express');
const exphbs  = require('express-handlebars');
const session = require('express-session')
const routes = require('./routes');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session({
  /*genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },*/
  secret: 'amazing-grace',
  resave: false,
  saveUninitialized: false
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view handler
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// public assets directory
app.use(express.static(path.join(__dirname, 'public'), {extensions: ['html'], index: false}));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});