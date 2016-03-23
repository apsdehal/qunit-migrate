var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isModule = require('../checks/is-module');

module.exports = ModuleFunction;

function ModuleFunction() {
  this._property = constants.module;
  this._optionName =  optionNames.ModuleFunction;
};


ModuleFunction.prototype = {
  check: function (context) {
    return isModule(context);
  },

  update: function (context) {
    var _self = this;
    var node = context.node;
    node.callee = builder.memberExpression(
      builder.identifier(constants.qunit),
      builder.identifier(_self._property),
      false
    );
    context.update(node);
  },

  getOptionName: function () {
    return this._optionName;
  }
};
