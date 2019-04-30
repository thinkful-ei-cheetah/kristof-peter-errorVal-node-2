'use strict'

const express = require('express');
const morgan = require('morgan');
const store = require('./playstore');

const app = express();

app.use(morgan('dev'));

app.get('/app', (request, response) => {
  const query = request.query;
  const sort = query.sort;
  const genres = query.genre;

  const output = store;
  console.log(`sort: ${sort}, genre: ${genres}`);

  response.status(200).json(output);
});



app.listen(8080, function() {
  console.info(`Server is listening on ${this.address().port}`);
});

