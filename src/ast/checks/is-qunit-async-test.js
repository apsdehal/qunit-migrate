var constants = require('../constants');
var isAsyncTest = require('./is-async-test');


module.exports = function (context) {
  var node = context.node;
  var callee = node.callee;
  return isAsyncTest({node: node}) ||
         (node.type === 'CallExpression' &&
         callee.type === "MemberExpression" &&
         callee.object &&
         callee.object.type === "Identifier" &&
         callee.object.name === constants.qunit &&
         callee.property &&
         callee.property.type === "Identifier" &&
         callee.property.name === constants.asyncTest);
}
