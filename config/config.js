var fs = require('fs');
var env = process.env.NODE_ENV || 'development';
var rawConfig = require('./config.json');

var lookupParams = [
  'ca',
  'cert',
  'key'
];

function loadSslPaths(config) {
  var envConfig = config[env];
  if (envConfig && envConfig.dialectOptions && envConfig.dialectOptions.ssl) {
    var ssl = envConfig.dialectOptions.ssl;
    for (p of lookupParams) {
      if (ssl[p + 'Path'] && ! ssl[p]) {
        ssl[p] = fs.readFileSync(ssl[p + 'Path']);
      }
    }
  }
  return config;
}

module.exports = loadSslPaths(rawConfig);
