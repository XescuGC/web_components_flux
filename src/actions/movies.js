const WCFAppDispatcher = require('../dispatcher');

function loadMovies (movies) {
  WCFAppDispatcher.dispatch({ type: 'LOAD_MOVIES', payload: { movies } })
}

function loadMovie (movie) {
  WCFAppDispatcher.dispatch({ type: 'LOAD_MOVIE', payload: { movie } })
}

function fetchMovies () {
  fetch('/movies', {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).then(res => res.json()).then(json => loadMovies(json))
}

function fetchMovie(imdbID) {
  fetch(`/movies/${imdbID}`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).then(res => res.json()).then(json => loadMovie(json))
}

module.exports = {
  actions: {
    fetchMovies: fetchMovies,
    fetchMovie:  fetchMovie,
  }
}
