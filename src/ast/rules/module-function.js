var builder = require('recast').types.builders;
var QUnitPropertyBaseRule = require('./qunit-property-base');
var constants = require('../constants');
var optionNames = require('../option-names');

module.exports = ModuleFunction;

function ModuleFunction() {
  QUnitPropertyBaseRule.call(this, constants.module, optionNames.ModuleFunction);
}

ModuleFunction.prototype = Object.create(QUnitPropertyBaseRule.prototype);

ModuleFunction.constructor = ModuleFunction;
