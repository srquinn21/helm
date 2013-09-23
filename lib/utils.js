var fs = require('fs')
  , path = require('path');

exports.lazyLoadModules = function (dir, options) {
  var files = fs.readdirSync(dir)
    , options = options || { blacklist: [] }
    , modules = {}
    , blacklist = ['.DS_Store'];

  // Mount up the modules
  files.forEach(function (file) {
    if (!~blacklist.indexOf(file) && !~options.blacklist.indexOf(file)) {
      var module = path.join(process.cwd(), dir, file);
      file = path.basename(file, '.js');
      modules[file] = require(module);
    }
    return;
  });

  return modules;
}