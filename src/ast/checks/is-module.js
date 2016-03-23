var constants = require('../constants');

module.exports = function (node, context) {
  return  node.type === "CallExpression" &&
          node.callee &&
          node.callee.type === "Identifier" &&
          node.callee.name === constants.module;
}
