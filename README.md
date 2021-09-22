# Yale Rare Books Reservations


## Application Structure
This is to provide detail explanation of the project structure using MVC pattern.

### Models Folder - models
1. Contains classes for mapping to database tables. 

### Routes - routes
1. Definition of url routes for main page and sub directories
2. Api route definitions. 
3. Middleware for connecting the models and views.

### Views - views
1. This is a handlebar ui element builder. [Refer to](https://www.npmjs.com/package/express-handlebars) for more details.

### Public Asset - public/assets
1. Contains all css, images and javascript used on the client side.
Example of how to include in html `<script src='/assets/login.js'></script>`