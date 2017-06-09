import mongoose from 'mongoose';
import Terminal from './terminal'

const airportSchema = new mongoose.Schema({
  name: String,
  country: String,
  terminals: [mongoose.model('Terminal').schema],
  opened: Date
});


const Airport = mongoose.model('Airport', airportSchema);

module.exports = Airport;
