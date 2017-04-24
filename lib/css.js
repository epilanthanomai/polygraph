var autoreset = require('postcss-autoreset');
var cssnext = require('postcss-cssnext');
var path = require('path');
var postcss = require('gulp-postcss');
var precss = require('precss');
var cssnano = require('cssnano');

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

var postcssOptions = [
  precss,
  autoreset(autoresetOptions),
  cssnext,
  cssnano
];

module.exports = postcss(postcssOptions);
