const WCFAppDispatcher = require('../dispatcher');

function loadMovies (movies) {
  WCFAppDispatcher.dispatch({ type: 'LOAD_MOVIES', payload: { movies } })
}

function fetchMovies () {
  fetch('/movies', {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).then(res => res.json()).then(json => loadMovies(json))
}

module.exports = {
  actions: {
    fetchMovies: fetchMovies
  }
}
