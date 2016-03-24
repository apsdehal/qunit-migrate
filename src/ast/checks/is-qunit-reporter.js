var constants = require('../constants');
var isReporter = require('./is-reporter');

var reporters = [
  constants.logReporting,
  constants.beginReporting,
  constants.doneReporting,
  constants.logReporting,
  constants.moduleDoneReporting,
  constants.moduleStartReporting,
  constants.testDoneReporting,
  constants.testStartReporting
];

module.exports = function (context) {
  var node = context.node
  var parent = context.parent;

  return isReporter({node: node, parent: parent}) ||
         (node.type === "MemberExpression" &&
         node.object &&
         node.object.type === "Identifier" &&
         node.object.name === constants.qunit &&
         node.property &&
         node.property.type === "Identifier" &&
         reporters.indexOf(node.property.name) > 1);
}
