var constants = require('../constants');
var isModule = require('./is-module');


module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;
  var callee = node.callee;
  return isModule({node: node}) ||
         (node.type === 'CallExpression' &&
         callee.type === "MemberExpression" &&
         callee.object &&
         callee.object.type === "Identifier" &&
         callee.object.name === constants.qunit &&
         callee.property &&
         callee.property.type === "Identifier" &&
         callee.property.name === constants.module);
}
