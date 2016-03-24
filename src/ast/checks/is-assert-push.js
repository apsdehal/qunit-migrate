var constants = require('../constants');

module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;

  return node.type === 'MemberExpression' &&
         node.object &&
         node.object.type === 'Identifier' &&
         node.object.name === constants.qunit &&
         node.property &&
         node.property.type === 'Identifier' &&
         node.property.name === constants.assertPush &&
         parent &&
         parent.node &&
         parent.node.type === 'CallExpression';
};
