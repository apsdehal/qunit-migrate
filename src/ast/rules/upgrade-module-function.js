var builder = require('recast').types.builders;
var QunitPropertyBaseRule = require('./qunit-property-base');
var constants = require('../constants');

module.exports = UpgradeModuleFunction;

function UpgradeModuleFunction () {
  QunitPropertyBaseRule.call(this, constants.module);
}

UpgradeModuleFunction.prototype = Object.create(UpgradeModuleFunction.prototype);

UpgradeModuleFunction.constructor = UpgradeModuleFunction;
