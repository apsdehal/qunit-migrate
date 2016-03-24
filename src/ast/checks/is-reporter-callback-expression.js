var constants = require('../constants');
var isQUnitReporter = require('./is-qunit-reporter');

module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;

  return node.type === 'AssignmentExpression' &&
         node.right &&
         node.right.type === 'FunctionExpression' &&
         node.left &&
         isQUnitReporter({ node: node.left, parent: parent });
}
