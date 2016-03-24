var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isModuleParams = require('../checks/is-module-params');

module.exports = ModuleFunctionParams;

function ModuleFunctionParams() {
  this._property = constants.module;
  this._optionName =  optionNames.ModuleFunctionParams;
  this._nameMap = {};
  this._nameMap[constants['moduleSetup']] = constants.moduleBeforeEach;
  this._nameMap[constants['moduleTeardown']] = constants.moduleAfterEach;
};


ModuleFunctionParams.prototype = {
  check: function (context) {
    return isModuleParams(context);
  },

  update: function (context) {
    var _self = this;
    var node = context.node;
    node.name = this._nameMap[node.name];
    context.update(node);
  },

  getOptionName: function () {
    return this._optionName;
  }
};
