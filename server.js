'use strict';

const app = require('./app');

app.listen(8080, function() {
    console.info(`Server is listening on ${this.address().port}`);
  });


