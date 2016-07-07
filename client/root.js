var polygraph = require('./polygraph');

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', domLoaded);
} else {
  domLoaded();
}

function domLoaded() {
  polygraph.init({
    rootSelector: '.polygraph',
    graphPath: '/polygraph/graph.json'
  });
}
