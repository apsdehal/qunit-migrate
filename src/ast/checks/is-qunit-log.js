var constants = require('../constants');
var isLog = require('./is-log');


module.exports = function (context) {
  var node = context.node
  var parent = context.parent;

  return isLog({node: node, parent: parent}) ||
         (node.type === "MemberExpression" &&
         node.object &&
         node.object.type === "Identifier" &&
         node.object.name === constants.qunit &&
         node.property &&
         node.property.type === "Identifier" &&
         node.property.name === constants.log);
}
