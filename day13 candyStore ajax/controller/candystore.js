const uuidV4 = require('uuid/v4');


let store = [];

/* return all the candy */

// ES6
// export is same as this to make public. but sits in this file.
exports.list = () => {
  return store;
};

/* create candy  */
exports.create = (candy) => {
  candy.id = uuidV4();
  store.push(candy);
  return candy;
};

/* get(read) candy  */
exports.get = (id) => {
  const candy = store.filter((candy) => {
    return candy.id == id;
  });

  // check function for more than 1 candy with the same id
  // Write the error to the log.

  return candy[0];
};

/* update candy  */
exports.update = (newCandy) => {

  store.forEach((candy, index) => {
    if (candy.id == newCandy.id) {
      store[index] = newCandy;
    }
  });

  return newCandy;
};

/* delete candy  */
exports.delete = (id) => {
  let deleted = false;

  store.forEach((candy, index) => {
    if (candy.id == id) {
      store.splice(index, 1);
      deleted = true;
    }
  });

  return deleted;
};
