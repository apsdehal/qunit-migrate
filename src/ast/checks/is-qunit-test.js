var constants = require('../constants');
var isTest = require('./is-test');


module.exports = function (context) {
  var node = context.node;
  var callee = node.callee;
  return isTest({node: node}) ||
         (node.type === 'CallExpression' &&
         callee.type === "MemberExpression" &&
         callee.object &&
         callee.object.type === "Identifier" &&
         callee.object.name === constants.qunit &&
         callee.property &&
         callee.property.type === "Identifier" &&
         callee.property.name === constants.test);
}
