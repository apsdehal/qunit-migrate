var recast = require('recast');
var traverse = require('traverse');
var applicant = require('./applicant');
var builder = recast.types.builders;
var fs = require('fs');

var code = fs.readFileSync('./test.js')

var ast = recast.parse(code);

var Applicant = new applicant();

traverse(ast).forEach( function (node) {
  if (node) {
    Applicant.apply(this);
  }
});

console.log(recast.print(ast).code);
