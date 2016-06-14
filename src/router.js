let routes = {}

function register(path, container) {
  routes[`^${path.replace(/\/:.[^\/]*/g, '/(.[^\/]*)')}$`] = { container }
}

let el = null;

function fireRoute () {
  el = el || document.getElementById('root');

  const url = location.hash.slice(1) || location.pathname;

  const route = findRoute(url);

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

  return routes[key];
}

function renderTemplate(el, link, data) {
  const template = link.import.querySelector('template')
  const fragment = document.importNode(template.content, true);
  //FIXME: Make it work with FF: http://stackoverflow.com/questions/35047590/html-templates-and-html-import-inner-script-not-executing-in-firefox
  //if (isFF()) {
    //const scripts = template.content.querySelectorAll('script');
    //Array.prototype.forEach.call(scripts, s => insertScript(s))
  //}
  Stamp.expandInto(el, fragment, data);
}

function insertScript(s) {
  var script = document.createElement('script');
  script.id='test';
  script.text = s.text || s.textContent || s.innerHTML;
  s.parentNode.replaceChild(script, s); // FF
}

function isFF () {
  var userAgent = navigator.userAgent;
  return (/Firefox/gi).test(userAgent);
}
// Listen on hash change:
window.addEventListener('hashchange', fireRoute);

// Listen on page load:
window.addEventListener('load', fireRoute);

const router = {
  register: register,
  goTo(url) {
    history.pushState({}, '', url)
    fireRoute()
  }
}

module.exports = router;
