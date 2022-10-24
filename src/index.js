const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const session =  require('express-session');


//Inicialitations
const app = express();
require('./database');


//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views' ));
app.engine('.hbs', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join( app.get('views'), 'layouts' ),
    partialsDir: path.join( app.get('views'), 'partials' ),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

//Middleweres
app.use( express.urlencoded( { extended: false } ) );
app.use( methodOverride('_method') );
app.use( session({
    secret: 'mysecreteapp',
    resave: true,
    saveUninitialized: true,
}));

// Global variables

//Routes
app.use( require('./routes/index') ) ;
app.use( require('./routes/notes') ) ;
app.use( require('./routes/users') ) ;

//Static Files
app.use( express.static( path.join(__dirname, 'public') ));
//Server is linstenning
app.listen( app.get('port'), () => {
    console.log(`Server on port ${ app.get('port') }`);
});