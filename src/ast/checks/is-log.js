var constants = require('../constants');

module.exports = function (node) {
  return  node.type === "CallExpression" &&
          node.callee &&
          node.callee.type === "Identifier" &&
          node.callee.name === constants.log;
}
