import express from 'express';
import Car from '../model/car';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {

  console.log("got request");

  Car.find({}, (err, cars) => {
    if (err) return res.status(404).send('Not found');
    res.json(cars);
  });
});

/*
 *  Create
 */
 router.post('/', (req, res, next) => {

    const car = new Car();
    car.manufacturer = req.body.manufacturer || "Unknown";
    car.model = req.body.model || "Unknown";
    car.year = req.body.year || "-1";
    car.color = req.body.color || "Unknown";
    car.kms = req.body.kms || "-1";
    car.price = req.body.price || "-1";
    car.save((err, car) => {
         res.json(car);
    });
 });

 /*
  *  Read
  */
  router.get('/:id', (req, res, next) => {

    const id = req.params.id;
    Car.findById(id, (err, car) => {
      if (err) return res.status(404).send('Not found');
      res.json(car);
    });
  });


  /*
   *  Update
   */
   router.put('/:id', (req, res, next) => {
     console.log("Got PUT Request");

     const car = req.body.car;

     Car.findById(car._id, (err, foundCar) => {
        if (err) return res.status(400).send('Bad Request');

        if(!foundCar){
          return res.status(404).send('Not Found');
        }

        foundCar.manufacturer = car.manufacturer;
        foundCar.model = car.model;
        foundCar.year = car.year;
        foundCar.color = car.color;
        foundCar.kms = car.kms;
        foundCar.price = car.price;

        foundCar.save((err, car)=> {
          if (err) return res.status(400).send('Bad Request');
          res.json(foundCar);
        });

     });
   });


   /*
    *  Delete
    */
    router.delete('/:id', (req, res, next) => {

      const id = req.params.id;
      Car.findById(id, (err, car) => {
        if (err) return res.status(400).send('Bad Request');

        if(!car){
          return res.status(404).send('Not Found');
        }

        car.remove();

        res.json("ok");
      });
    });


export default router;
