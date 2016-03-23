var builder = require('recast').types.builders;
var QUnitPropertyBaseRule = require('./qunit-property-base');
var constants = require('../constants');
var optionNames = require('../option-names');

module.exports = LogFunction;

function LogFunction() {
  QUnitPropertyBaseRule.call(this, constants.log, optionNames.LogFunction);
}

LogFunction.prototype = Object.create(QUnitPropertyBaseRule.prototype);

LogFunction.constructor = LogFunction;
