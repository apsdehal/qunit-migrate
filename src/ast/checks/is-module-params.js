var constants = require('../constants');
var isQUnitModule = require('./is-qunit-module');

var nameMap = {};
nameMap[constants['moduleSetup']] = constants.moduleBeforeEach;
nameMap[constants['moduleTeardown']] = constants.moduleAfterEach;

// For assert change
nameMap[constants['moduleAfterEach']] = constants.moduleAfterEach;
nameMap[constants['moduleBeforeEach']] = constants.moduleBeforeEach;

module.exports = function (context) {
  var node = context.node;
  var parent = context.parent;

  return node.type === 'Identifier' &&
         nameMap.hasOwnProperty(node.name) &&
         parent &&
         parent.node &&
         parent.node.type === 'Property' &&
         parent.parent &&
         parent.parent.parent &&
         parent.parent.parent.node &&
         parent.parent.parent.node.type === 'ObjectExpression' &&
         parent.parent.parent.parent &&
         parent.parent.parent.parent.parent &&
         parent.parent.parent.parent.parent.node &&
         isQUnitModule(parent.parent.parent.parent.parent.node);
};
