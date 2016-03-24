var constants = require('../constants');
var isQUnitTest = require('./is-qunit-test');
var utils = require('../utils');

module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;

  return node.type === 'FunctionExpression' &&
         !utils.checkIfNodeParamsContain(node, constants.assert) &&
         parent &&
         parent.parent &&
         parent.parent.node.type === 'CallExpression' &&
         isQUnitTest({ node: parent.parent.node });
};
