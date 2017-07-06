import Mongoose from 'mongoose'

const carSchema = new Mongoose.Schema({
  manufacturer: String,
  model: String,
  year: Number,
  color: String,
  kms: Number,
  price: Number
}, { timestamps: true });

const Car = Mongoose.model('Car', carSchema);

module.exports = Car;
