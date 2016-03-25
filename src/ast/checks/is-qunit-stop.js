var constants = require('../constants');
var isStop = require('./is-stop');


module.exports = function (context) {
  var node = context.node;
  debugger;
  var callee = node.callee;
  return isStop({node: node}) ||
         (node.type === 'CallExpression' &&
         callee.type === "MemberExpression" &&
         callee.object &&
         callee.object.type === "Identifier" &&
         callee.object.name === constants.qunit &&
         callee.property &&
         callee.property.type === "Identifier" &&
         callee.property.name === constants.stop);
};
