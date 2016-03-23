var constants = require('../constants');

module.exports = function (node) {
  return node.type === 'Identifier' &&
         parent.node &&
         parent.node.type === 'Property' &&
         parent.parent &&
         parent.parent.node &&
         parent.parent.node.type === 'ObjectExpression';
}
