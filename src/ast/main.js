var recast = require('recast');
var estraverse = require('estraverse');
var applicant = require('./applicant');
var builder = recast.types.builders;

var code = 'var k = function () { module("Hi"); module("k"); log("uo"); }';

var ast = recast.parse(code);

var Applicant = new applicant();

var newAst = estraverse.replace(ast.program, {
  enter: function (node, parent) {
    var applyResponse = Applicant.apply(node,this);
    return applyResponse;
  }
});

console.log(recast.print(newAst).code);
