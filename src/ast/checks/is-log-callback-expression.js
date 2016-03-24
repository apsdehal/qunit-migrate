var constants = require('../constants');
var isQUnitLog = require('./is-qunit-log');

module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;
  if (node.type === 'AssignmentExpression') {
    debugger;
  }
  return node.type === 'AssignmentExpression' &&
         node.right &&
         node.right.type === 'FunctionExpression' &&
         node.left &&
         isQUnitLog({ node: node.left, parent: parent });
}
