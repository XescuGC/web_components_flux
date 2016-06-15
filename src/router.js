let routes = {}

function register(path, container) {
  routes[`^${path.replace(/\/:.[^\/]*/g, '/(.[^\/]*)')}$`] = { container }
}

let el = null;

function fireRoute () {
  el = el || document.getElementById('root');

  const url = location.hash.slice(1) || location.pathname;

  const { route, params } = findRoute(url);

  if (!history.state) history.pushState({}, '');
  history.state.params = { imdbID: params };

  if (el && route && route.container) {
    let link = WCFApp.import(`/containers/${route.container}.html`);

    if (link) {
      link.onload = function(e) {
        WCFApp.renderContainer(route.container);
      };
      link.onerror = function(e) {
        console.trace(e)
      };
    }
    else {
      WCFApp.renderContainer(route.container);
    }

    //Object.observe(route.controller, route.render);
  }

}

function findRoute(url) {
  let key = Object.keys(routes).find(route => url.match(route));

  return {route: routes[key], params: url.match(key)[1]}
}

// Listen on hash change:
window.addEventListener('hashchange', fireRoute);

// Listen on page load:
window.addEventListener('load', fireRoute);

const router = {
  register: register,
  goTo(url) {
    history.pushState({}, '', url)
    fireRoute();
  }
}

module.exports = router;
