/* warm up */

// 1.
db.restaurants.distinct('cuisine').sort()

// 2.
db.restaurants.distinct('cuisine', {
  'address.zipcode': '11414',
  'address.street': 'Cross Bay Boulevard'
 });

// 3.
db.getCollection('restaurants').find({
  name: /^Willi(.*)Steak House$/gi
}, { _id: 0, name: 1, address: 1 });

/* Pizza */

// 1.
db.getCollection('restaurants').find({
  cuisine: /Pizza/g,
  name: { $nin: [/Pizza/g, /Pizzeria/g] } });

// 2.
db.restaurants.distinct('grades.grade')
db.getCollection('restaurants').find({
  cuisine: /Pizza/g,
  borough: 'Queens',
  'grades.grade': { $nin: ['B', 'C', 'P', 'Z', 'Not Yet Graded'] }
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
  name: { $not: /Mcdonald/gi }
});

//4.
db.getCollection('restaurants').count({
  cuisine: 'Hamburgers',
  borough: 'Manhattan',
  name: { $nin: [/Mcdonald/gi, /Burger King/gi] }
});

// 5.
db.getCollection('restaurants').distinct('address.street', {
  cuisine: 'Hamburgers',
  borough: 'Manhattan',
  name: { $nin: [/Mcdonald/gi, /Burger King/gi] }
});

// 5 - from Jens
db.restaurant.distinct('address.street', {
  cuisine: 'Hamburgers',
  borough: 'Manhattan',
  $and : [
    { name: { $nin: [/Mcdonald/] } },
    { name: { $ne: 'Burger King' } }
  ]
})

// 6.
db.getCollection('restaurants').find({
  cuisine: 'Hamburgers',
  borough: 'Manhattan',
  'address.street': 'Pearl Street',
  name: { $nin: [/Mcdonald/gi, /Burger King/gi] }
}, { _id: 0, name: 1 });


// bonus
db.getCollection('restaurants').find({
  cuisine: 'Japanese',
  grades: { $size: 9 }
}, { _id: 0, name: 1 });
