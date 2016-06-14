const WCFAppDispatcher  = require('../dispatcher');
const EventEmitter      = require('events').EventEmitter;

let _movies = [];
const CHANGE_EVENT = 'change';

class MoviesStore extends EventEmitter {
  getAllMovies() { return _movies }

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
    default:
      break;
  }
})

module.exports = moviesStore;
