var constants = require('../constants');

var reporters = [
  constants.logReporter,
  constants.beginReporter,
  constants.doneReporter,
  constants.logReporter,
  constants.moduleDoneReporter,
  constants.moduleStartReporter,
  constants.testDoneReporter,
  constants.testStartReporter
];

module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;

  return  node.type === 'Identifier' &&
          reporters.indexOf(node.name) > -1 &&
          parent &&
          parent.node &&
          parent.node.type !== 'MemberExpression';
}
