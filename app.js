'use strict'

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/sum', (request, response) => {
  const query = request.query;
  const sort = Number(query.sort);
  const genres = Number(query.genre);

  const output = `${sort}, ${genres}`;

  response.status(200).json(output)
});



app.listen(8080, function() {
  console.info(`Server is listening on ${this.address().port}`);
});

