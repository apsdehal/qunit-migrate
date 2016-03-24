var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isModuleFunctionParamsValue = require('../checks/is-module-function-params-value');

module.exports = ModuleFunctionParamsValue;

function ModuleFunctionParamsValue() {
  this._property = constants.module;
  this._optionName =  optionNames.ModuleFunctionParamsValue;
  this._nameMap = {};
  this._nameMap[constants['moduleSetup']] = constants.moduleBeforeEach;
  this._nameMap[constants['moduleTeardown']] = constants.moduleAfterEach;
};


ModuleFunctionParamsValue.prototype = {
  check: function (context) {
    return isModuleFunctionParamsValue(context);
  },

  update: function (context) {
    var _self = this;
    var node = context.node;
    node.params.unshift(builder.identifier(constants.assert));
    context.update(node);
  },

  getOptionName: function () {
    return this._optionName;
  }
};
