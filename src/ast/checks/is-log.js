var constants = require('../constants');

module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;

  return  node.type === 'Identifier' &&
          node.name === constants.log &&
          parent &&
          parent.node &&
          parent.node.type !== 'MemberExpression';
}
