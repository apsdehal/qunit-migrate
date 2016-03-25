module.exports = function () {
  var fs = require('fs');
  var assert = require('assert');
  var glob = require('glob');
  var astApi = require('../../src/ast');
  var actual = [];
  var expected = [];

  glob('tests/data/**/*.js', function (error, files) {
    for (var i = 0; i < files.length; i++) {
      if (files[i].indexOf('actual') > -1) {
        actual.push(files[i]);
      } else if (files[i].indexOf('expected-ast') > -1) {
        expected.push(files[i]);
      }
    };

    describe('AST tests', function () {
      it('should convert properly', function () {
        var length = actual.length;

        for(var i = 0; i < length; i++) {
          assert.equal(
            astApi(fs.readFileSync(actual[i]).toString()),
            fs.readFileSync(expected[i]).toString());
        }
      })
    });
  });


}
