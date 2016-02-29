var autoreset = require('postcss-autoreset');
var cssnext = require('postcss-cssnext');
var path = require('path');
var postcss = require('postcss-middleware');
var precss = require('precss');

var excludeReset = [
      '--',
      ':',
      '\\.polygraph__node'
    ],
    excludeResetRE = RegExp('(' + excludeReset.join('|') + ')');

var autoresetOptions = {
  rulesMatcher: function(opts) {
    return !opts.selector.match(excludeResetRE);
  }
};

var postcssOptions = {
  src: function(req) {
    return path.join(__dirname, '../styles', req.path);
  },
  plugins: [
    precss,
    autoreset(autoresetOptions),
    cssnext,
  ]
};

module.exports = postcss(postcssOptions);
