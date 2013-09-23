var connect = require('connect')
  , less = require('less-middleware')
  , fs = require('fs')
  , path = require('path')
  // , shipyard = require('shipyard');

var server = connect();

/**
 *  Serve up the given directory or default to the current directory
 */
module.exports = function (dir, argv) {

  if ('string' !== typeof(dir)) {
    argv = dir;
    dir = path.resolve('.');
  }

  if (!fs.existsSync(dir)) return console.log('The path "%s" does not exist', dir);
  try {
    var pkg = require(path.join(dir, 'component.json'));  
  } catch (err) {
    return console.log('%s does not contain a component.json file', dir);
  }
  
  server.use(connect.logger('dev'));
  server.use(less({ src: dir }));
  server.use(connect.static(dir));

  server.listen(argv.parent.port, function () {
    console.log('Serving %s on port %d', pkg.name, argv.parent.port)
  });
  
}