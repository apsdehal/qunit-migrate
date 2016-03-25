var constants = require('../constants');

module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;
  var callee = node.callee;
  return (node.type === 'CallExpression' &&
         callee.type === "MemberExpression" &&
         callee.object &&
         callee.object.type === "Identifier" &&
         callee.object.name === constants.qunit &&
         callee.property &&
         callee.property.type === "Identifier" &&
         callee.property.name === constants.init);
}
