var builder = require('recast').types.builders;
var QunitPropertyBaseRule = require('./qunit-property-base');
var constants = require('../constants');

module.exports = ModuleFunction;

function ModuleFunction() {
  QunitPropertyBaseRule.call(this, constants.module);
}

ModuleFunction.prototype = Object.create(ModuleFunction.prototype);

ModuleFunction.constructor = ModuleFunction;
