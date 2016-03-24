var constants = require('../constants');
var isModuleParams = require('./is-module-params');
var utils = require('../utils');

module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;

  return node.type === 'FunctionExpression' &&
         !utils.checkIfNodeParamsContain(node, constants.assert) &&
         context.key === 'value' &&
         parent &&
         isModuleParams({ node: parent.node.key, parent: parent });

};
