global.jQuery = require('jquery');
require('./polygraph');

var graphPath = '/polygraph/graph.json';

jQuery(function($) {
  $('.polygraph').polygraph({
    graphPath: graphPath
  });
});
