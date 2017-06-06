const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// init modules
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const candiesController = require('./controller/candies')(app);

app.listen(3000, () => {
  console.log('Node.js listening on port 3000');
});
