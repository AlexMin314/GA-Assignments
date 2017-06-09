import mongoose from 'mongoose';
import Passenger from './passenger';

const flightSchema = new mongoose.Schema({
  from: String,
  to: String,
  airline: String,
  passengers: [mongoose.model('Passenger').schema]
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
