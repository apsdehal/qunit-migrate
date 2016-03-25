var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isJSDump = require('../checks/is-jsdump');

module.exports = JsDumpFunction;

function JsDumpFunction() {
  this._optionName =  optionNames.JsDumpFunction;
};


JsDumpFunction.prototype = {
  check: function (context) {
    return isJSDump(context);
  },

  update: function (context) {
    var _self = this;
    var node = context.node;
    node = builder.memberExpression(
      builder.identifier(constants.qunit),
      builder.identifier(constants.dumpExpression),
      false);

    context.update(node);
  },

  getOptionName: function () {
    return this._optionName;
  }
};
