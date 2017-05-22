## Introduction

You are to create a car rental service that stores your cars available for rental and customers who rent the cars.

### Customer Object
Your first goal is to create a Customer Object Constructor that have the following properties:

  1. id (string or number)
  2. name (string)
  3. carRented (object) (null by default)

### Car Object
Then you should create a Car Object Constructor that have the following properties:

  1. id (string or number)
  2. producer (string)
  3. model (string)
  4. rentalPricePerDay (number)
  5. available (boolean) (true by default)
  6. customer (object) (null by default)
  7. rentalDuration (number) (in days) (0 by default)
  8. quotePrice (function)
  9. reserve (function)
  10. return (function)

- The `quotePrice` function takes a variable call `rentalDuration` then returns the `rentalPrice * rentalDuration`

- The `reserve` function takes a `customer` object and `rentalDuration` value.
  1. Check if this car is available for rental
  2. If yes:
    1. Change `available` to `false`
    2. Set `this car's customer` to `customer`
    3. Set `this car's rentalDuration` to `rentalDuration`
    4. `return true`
  3. If no:
    1. `return false`

- The `return` function take no arguments.
  1. Check if this car is available
  2. If yes:
    1. `return "Sorry, this car have already been returned.";`
  3. If No:
    1. Set `this car's availible` to `true`
    2. Set `this car's customer` to null
    3. Set `this car's rentalDuration` to null;

### Vendor Object
After the Car Object, create a Vendor Object Constructor that have the following properties:

  1. name (string) (provided)
  2. cars (array) (empty array by default) (provided)
  3. customers (array) (empty array by default) (provided)
  4. findCarIndex (function) (provided)
  5. findCustomerIndex (function) (provided)
  6. getCar (function) (provided)
  7. getCustomer (function) (provided)
  8. addCar (function)
  9. addCustomer (function)
  10. removeCar (function)
  11. removeCustomer (function)
  12. availableCars (function)
  13. rentCar (function)
  14. returnCar (function)
  15. totalRevenue (function)

- The `findCarIndex`/`findCustomerIndex` function takes an `carID`/`customerID` and returns the index or -1.

- The `getCar`/`getCustomer` function takes a `carID`/`customerID` and returns the actual car/customer object or undefined.

- The `addCar`/`addCustomer` function takes a `carObj` or `customerObj`.
  1. Check if `car`/`customer` exists using `getCar`/`getCustomer`
  2. If `car`/`customer` is found
    1. `console.log("ID already exists")`
  3. Else
    1. Push the `carObj`/`customerObj` into `cars`/`customers` list
    1. `console.log("Car/Customer added to warehouse")`

- The `removeCar`/`removeCustomer` function takes an `carID`/`customerID`.
  1. Check if `car`/`customer` exists using `findCarIndex`/`findCustomerIndex`
  2. If `carIndex/customerIndex >= 0`
    1. Delete car/customer from the cars/customers list using `array.splice`
    2. `console.log("Car/Customer deleted");`
  3. Else
    1. `console.log("Car/Customer not found")`

- The `availableCars` function take no arguments. Use the array.filter to generate an array of cars available for rent.

- The `rentCar` function takes `customerID` and `rentalDuration`
  1. Get a list of available cars using the function `availableCars`
  2. If `availableCars` array is empty
    1. `console.log("All our cars have been rented")`
  3. Else
    1. Get customer using the function `getCustomer`
    2. If customer is found
      1. Set `customer's carRented` to the first available car
      2. Call the `car's reserve` function with `customerObj` and `rentalDuration`
      3. `console.log("The car has been reserved");`
    3. Else
      1. `console.log("Please provide a valid customerID");`

- The `returnCar` function takes a `customerID`
  1. Get customer using the function `getCustomer`
  2. if customer is found
    1. Call `customer's carRented's return` function
    2. Set `customer's carRented` to `null`
    3. `console.log( "Thank you for using our service");`
  3. else
    1. `console.log("Please provide a valid customerID");`

- The `totalRevenue` function takes no arguments. Use the array.reduce to sum up the revenues for each car.