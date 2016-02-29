global.jQuery = require('jquery');
require('./polygraph');

var graphPath = '/graph.json';

jQuery(function($) {
  $('.polygraph').polygraph({
    graphPath: graphPath
  });
});
