const express = require( "express");
const {create} = require( "express-handlebars");
const path = require( "path");
const morgan = require( "morgan");
const methodOverride = require( "method-override");
const flash = require( 'connect-flash')
const session = require( "express-session");
const passport = require( 'passport');

//INIATIALIZATIONS
const app = express();
require('./config/passport')

app.set("views", path.join(__dirname, "views"));

const exphbs = create({
  extname: '.hbs',
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  defaultLayout:'main'
});

app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs");

//MIDDLEWARE
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());
app.use(session({
  secret: 'mi_secreto', // Secreto para firmar la sesión
  resave: false, // Evitar la sobreescritura de sesiones no modificadas
  saveUninitialized: true, // Guardar sesiones incluso si no hay datos
}));


//Global variables
app.use((req,res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/products.routes'))
app.use(require('./routes/user.routes'))
app.use(require('./routes/cart.routes'))
app.use(require('./routes/payment.routes'))
app.use(require('./routes/category.routes'))

//Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;