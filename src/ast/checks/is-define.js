var constants = require('../constants');

module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;
  return node &&
        node.type === 'ExpressionStatement' &&
        node.expression &&
        node.expression.type === 'CallExpression' &&
        node.expression.callee &&
        node.expression.callee.type === 'Identifier' &&
        node.expression.callee.name === constants.defineExpression &&
        node.expression.arguments &&
        node.expression.arguments.length > 0 &&
        parent &&
        parent.parent &&
        parent.parent.node.type === 'Program';
}
