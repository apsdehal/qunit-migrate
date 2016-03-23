var constants = require('../constants');

module.exports = function (context) {
  var node = context.node;
  return  node.type === "CallExpression" &&
          node.callee &&
          node.callee.type === "Identifier" &&
          node.callee.name === constants.log;
}
