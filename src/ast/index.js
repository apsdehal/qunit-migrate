var recast = require('recast');
var traverse = require('traverse');
var applicant = require('./applicant');
var builder = recast.types.builders;

module.exports = function (code) {
  var ast = recast.parse(code);

  var Applicant = new applicant();

  traverse(ast).forEach( function (node) {
    if (node) {
      Applicant.apply(this);
    }
  });
  return recast.print(ast).code;
}
