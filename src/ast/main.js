var recast = require('recast');
var estraverse = require('estraverse');
var builder = recast.types.builders;

var code = 'var k = function () { module("Hi") }';

var ast = recast.parse(code);

var newAst = estraverse.replace(ast.program, {
  enter: function (node, parent) {
  }
});

console.log(recast.print(newAst).code);
