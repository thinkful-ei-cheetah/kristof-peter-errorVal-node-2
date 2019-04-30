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
  let output = store;

  if (sort) {
    let valid = ['Rating', 'App']
    if (!valid.includes(sort)){
      response.status(404).send('error not a sort option');
    }
    // if(sort === 'Rating') {
    //   output = output.sort( (a,b) => {
    //     return b[sort] - a[sort]
    //   });
    // }
    // if(sort === 'App'){


      output = output.sort( (a,b) => {
        return a[sort].toString().localeCompare(b[sort].toString(), 'en', {sensitivity: 'base', numeric: true});
      })
    //}
  }

  if(genres){
    const valid = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card']
    if(!valid.includes(genres)){
      response.status(404).send('error not a genre');
    }
    output = output.filter(item => item.Genres.toLowerCase().includes(genres.toLowerCase()))
  }
  
  console.log(`sort: ${sort}, genre: ${genres}`);

  response.status(200).json(output);
});



app.listen(8080, function() {
  console.info(`Server is listening on ${this.address().port}`);
});
