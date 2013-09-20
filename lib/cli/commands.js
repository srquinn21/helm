var server = require('../server')
  , fs = require('fs')
  , path = require('path')
  // , shipyard = require('shipyard');

/**
 *  Serve up the given directory or default to the current directory
 */
exports.serve = function (path, argv) {

  if ('string' !== typeof(path)) {
    argv = path;
    path = '.';
  }

  if (!fs.existsSync(path)) return console.log('Not a valid path');
  
  server.listen(argv.parent.port, function () {
    console.log('Serving %s on port %d', path, argv.parent.port)
  });
  
}

exports.deploy = function () {
  return function (cmd, argv) {
    console.log(cmd);
  }
}