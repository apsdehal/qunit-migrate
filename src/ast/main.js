var recast = require('recast');
var estraverse = require('estraverse');
var applicant = require('./applicant');
var builder = recast.types.builders;

var code = 'var k = function () { module("Hi"); module("k") }';

var ast = recast.parse(code);

var Applicant = new applicant();

var newAst = estraverse.replace(ast.program, {
  enter: function (node, parent) {
    var applyResponse = Applicant.apply(node);

    if (applyResponse.flag) {
      this.skip();
      return applyResponse.node;
    }
  }
});

console.log(recast.print(newAst).code);
