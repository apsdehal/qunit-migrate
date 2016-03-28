var constants = require('../constants');

module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;

  return (node.type === 'MemberExpression' &&
         node.object.type === 'Identifier' &&
         node.object.name === constants.qunit &&
         node.property &&
         node.property.type === 'Identifier' &&
         node.property.name === constants.jsdumpExpression &&
         parent &&
         parent.node &&
         parent.node.type === 'MemberExpression' &&
         parent.parent &&
         parent.parent.parent.node &&
         parent.parent.parent.node.type === 'ExpressionStatement' &&
         parent.parent.parent.node.expression &&
         parent.parent.parent.node.expression.type === 'CallExpression');
}
