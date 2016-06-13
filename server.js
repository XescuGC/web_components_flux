const express     = require('express');
const morgan      = require('morgan');
const compression = require('compression');

const app = express();

app.use(morgan('dev'));

app.use(compression())

app.use(express.static(`${__dirname}/dist`));
app.use(express.static(`${__dirname}/bower_components`));
app.use(express.static(`${__dirname}/src`));
app.get('*', (req, res, next) => res.sendFile(`${__dirname}/index.html`));

// Handle errors
app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

// Start server
const server = app.listen((process.env.PORT || 8000), function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
})
