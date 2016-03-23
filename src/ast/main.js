var recast = require('recast');
var estraverse = require('estraverse');
var builder = recast.types.builders;

var code = 'var k = function () { module("Hi") }';

var ast = recast.parse(code);


var moduleQUnitExpression = builder.memberExpression(
  builder.identifier("QUnit"),
  builder.identifier("module"),
  false
);


var newAst = estraverse.replace(ast.program, {
  enter: function (node, parent) {
    console.log(node.type);
    if (node.type == 'Identifier' && node.name == 'module') {
      this.break();
      return moduleQUnitExpression;
    }
  }
});

console.log(recast.print(newAst).code);
