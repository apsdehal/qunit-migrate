var constants = require('../constants');
var isModule = require('./is-module');


module.exports = function (node) {
  var callee = node.callee;
  return isModule({node: node}) ||
         (node.type === 'CallExpression' &&
         callee.type === "MemberExpression" &&
         callee.object &&
         callee.object.type === "Identifier" &&
         callee.object.name === "QUnit" &&
         callee.property &&
         callee.property.type === "Identifier" &&
         callee.property.name === "module");
}
