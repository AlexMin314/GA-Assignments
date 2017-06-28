var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// Init app
var app = express();

// Connect with Mongo DB
mongoose.connect('mongodb://localhost/node-template');

// Init middel-ware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Setup sessions
/**http://passportjs.org/docs
 * In a Connect or Express-based application,
 * passport.initialize() middleware is required to initialize Passport.
 * If your application uses persistent login sessions, passport.session()
 * middleware must also be used.
 * If authentication succeeds, a session will be established and
 * maintained via a cookie set in the user's browser.
 */

// restoring session?
app.use(session({ secret: 'ilovevdi' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Setup local-strategy
require('./config/passport')(passport);

// Routes
require('./routes/routes')(app, passport);

// listen
app.listen(3000, function () {
  console.log('lisning on port 3000');
});
