const express     = require('express');
const morgan      = require('morgan');
const compression = require('compression');
const fs          = require('fs');

const app = express();

const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies.json`));

app.use(morgan('dev'));

app.use(compression())

app.use(express.static(`${__dirname}/dist`));
app.use(express.static(`${__dirname}/bower_components`));
app.use(express.static(`${__dirname}/src`));

app.get('/movies', (req, res, next) => {
  res.json(movies);
});

app.get('/movies/:id', (req, res, next) => {
  const movie = movies.find(m => m.imdbID === req.params.id);
  if (movie)  { res.json(movie) }
  else        { res.status(404).json({ error: 'Movie not found' }) }
});

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
