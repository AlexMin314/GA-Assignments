import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
// import logger from 'morgan';
// import favicon from 'serve-favicon';
import path from 'path';
import lessMiddleware from 'less-middleware';
import index from './routes/index';
// mongoose
import mongoose from 'mongoose';
// models
import Airport from './models/airport';
import Flight from './models/flight';
import Passenger from './models/passenger';
import Terminal from './models/terminal';

const app = express();
const debug = Debug('day-15-mongoose-1:app');

// connect to MongoDB
mongoose.connect('mongodb://localhost/airportToy');

// Asynchronous
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // drop collections
  db.db.dropDatabase((err, result) => {
    if (err) console.log(err);
    console.log('database dropped', result)
  })
  // create data
  let flight1 = new Flight({
    from: 'CDG France',
    to: 'JFK New-York, USA',
    airline: 'American Airlines',
  });

  let flight2 = new Flight({
    from: 'Heathrow UK',
    to: 'JFK New-York, USA',
    airline: 'British Airways',
  });

  let airport1 = new Airport({
    name: 'JFK',
    country: 'USA',
    opended: Date('1990-12-08')
  });

  let terminal1 = new Terminal({
    name: 'Terminal 1',
    capacity: 234324
  });

  // Push
  terminal1.flight.push(flight1);
  terminal1.flight.push(flight2);

  // Save date
  flight1.save((err) => {
    if (err) return console.log(err.message);
  });
  flight2.save((err) => {
    if (err) return console.log(err.message);
  });
  airport1.save((err) => {
    if (err) return console.log(err.message);
  });
  terminal1.save((err) => {
    if (err) return console.log(err.message);
  });
})

// Read Data.
Flight.find({}, (err, flights) => {
  console.log('==== flights Info below ===');
  console.log(flights);
});
Airport.find({}, (err, airports) => {
  console.log('==== airports Info below ===');
  console.log(airports);
});
Terminal.find({}, (err, terminals) => {
  console.log('==== terminals Info below ===');
  console.log(terminals);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
