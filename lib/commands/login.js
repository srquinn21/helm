var promptly = require('promptly')
  , request = require('superagent')
  , path = require('path');


module.exports = function () {
  promptly.prompt('Username: ', function (err, user) {
    if (err) return process.kill();
    promptly.password('Password: ', function (err, pass) {
      if (err) return process.kill();
      request
        .post('/api/pet')
        .send({ user: user, pass: pass })
        .set('Accept', 'application/json')
        .end(function (error, res) {

          console.log();
          console.log('Hello, %s! Your password is %s', user, pass);
          console.log();

        });
    });
  })
}