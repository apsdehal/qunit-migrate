var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isStart = require('../checks/is-start');

module.exports = StartFunction;

function StartFunction() {
  this._optionName =  optionNames.StartFunction;
};


StartFunction.prototype = {
  check: function (context) {
    return isStart(context);
  },

  update: function (context) {
    var _self = this;
    var node = context.node;
    node.callee = builder.memberExpression(
      builder.identifier(constants.qunit),
      builder.identifier(node.callee.name),
      false
    );
    context.update(node);
  },

  getOptionName: function () {
    return this._optionName;
  }
};
