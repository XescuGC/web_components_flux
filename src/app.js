const router = require('./router');
const actions = require('./actions/movies').actions;
const MoviesStore = require('./stores/movies');

const WCFApp = {};
const containers = {};

WCFApp.router = router;
WCFApp.actions = actions;
WCFApp.stores = {
  movies: MoviesStore
};

WCFApp.registerContainer = function(container, renderer) {
  containers[container] = renderer;
}

WCFApp.renderContainer = function(container) {
  let renderer = containers[container];
  if (renderer) { renderer() }
  else { throw `Invalid container to render: ${container}` }
}

WCFApp.router.register('/',               'movies');
WCFApp.router.register('/movies',         'movies');
WCFApp.router.register('/movies/:imdbID', 'movie');

WCFApp.importComponents = function(components) {
  components.forEach(component => {
    WCFApp.import(`components/${component}.html`);
  })
}

WCFApp.import = function(url) {
  let link = document.querySelector(`link[href='${url}'`);

  if (link) return false;

  link      = document.createElement('link');
  link.rel  = 'import';
  //link.setAttribute('async', ''); // make it async!
  link.href = url
  document.head.appendChild(link);

  return link;
}

window.WCFApp = WCFApp;
