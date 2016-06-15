const WCFAppDispatcher  = require('../dispatcher');
const EventEmitter      = require('events').EventEmitter;

let _movies = [];
let _selectedMovie;

const CHANGE_EVENT = 'change';

class MoviesStore extends EventEmitter {
  getAllMovies()    { return _movies }
  getMovie(imdbID)  {
    return _movies.find(m => m.imdbID === imdbID) || (_selectedMovie && _selectedMovie.imdbID === imdbID ? _selectedMovie : undefined)
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
}

const moviesStore = new MoviesStore();

MoviesStore.prototype.dispatchToken = WCFAppDispatcher.register(action => {
  const { payload } = action;

  switch (action.type) {
    case 'LOAD_MOVIES':
      _movies = payload.movies;
      moviesStore.emitChange()
      break;
    case 'SELECT_MOVIE':
      _selectedMovie = _movies.find(m => m.imdbID === payload.imdbID);
      moviesStore.emitChange()
      break;
    case 'LOAD_MOVIE':
      _selectedMovie = payload.movie;
      moviesStore.emitChange()
      break;
    default:
      break;
  }
})

module.exports = moviesStore;
