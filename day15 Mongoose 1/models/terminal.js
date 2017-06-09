import mongoose from 'mongoose';
import Flight from './flight';

const terminalSchema = new mongoose.Schema({
  name: String,
  flight: [mongoose.model('Flight').schema],
  capacity: Number
});

const Terminal = mongoose.model('Terminal', terminalSchema);

module.exports = Terminal;
