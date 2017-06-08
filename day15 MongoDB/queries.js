/* warm up */

// 1.
db.getCollection('restaurants').find({}).sort({ cuisine: 1 });

// 2.
db.restaurants.distinct('cuisine', {
  address.zipcode: '11414',
  address.street: 'Cross Bay Boulevard'
 });

// 3.
db.getCollection('restaurants').find({
  name: /^Jen(.*)Steak House$/gi
}, { _id: 0, name: 1, address: 1 });

/* Pizza */

// 1.
db.getCollection('restaurants').find({
  cuisine: 'Pizza',
  name: { $nin: [/Pizza/gi, /Pizzeria/gi] } });

// 2.
db.restaurants.distinct('grades.grade')
db.getCollection('restaurants').find({
  cuisine: 'Pizza',
  borough: /Queens/gi,
  grades.grade: { $nin: ['B', 'C', 'P', 'Z', 'Not Yet Graded'] }
}, { _id: 0, name: 1 });

/* hamburger */

// 1.
db.getCollection('restaurants').count({cuisine: 'Hamburgers'});

// 2.
db.getCollection('restaurants').count({
  cuisine: 'Hamburgers',
  borough: 'Manhattan'
});

// 3.
db.getCollection('restaurants').count({
  cuisine: 'Hamburgers',
  borough: 'Manhattan',
  name: { $not: /Mcdonald'S/gi }
});

//4.
db.getCollection('restaurants').count({
  cuisine: 'Hamburgers',
  borough: 'Manhattan',
  name: { $nin: [/Mcdonald'S/gi, /Burger King/gi] }
});

// 5.
db.getCollection('restaurants').distinct('address.street', {
  cuisine: 'Hamburgers',
  borough: 'Manhattan',
  name: { $nin: [/Mcdonald'S/gi, /Burger King$/gi] }
});

// 6.
db.getCollection('restaurants').find({
  cuisine: 'Hamburgers',
  borough: 'Manhattan',
  'address.street': 'Pearl Street',
  name: { $nin: [/Mcdonald'S/gi, /Burger King/gi] }
}, { _id: 0, name: 1 });
