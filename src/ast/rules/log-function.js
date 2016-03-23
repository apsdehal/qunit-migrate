var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isLog = require('../checks/is-log');

module.exports = LogFunction;

function LogFunction() {
  this._property = constants.log;
  this._optionName =  optionNames.LogFunction;
};


LogFunction.prototype = {
  check: function (context) {
    return isLog(context.node);
  },

  update: function (context) {
    var node = context.node;
    var _self = this;

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
