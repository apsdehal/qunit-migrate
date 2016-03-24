var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isTest = require('../checks/is-test');

module.exports = TestFunction;

function TestFunction() {
  this._property = constants.test;
  this._optionName =  optionNames.TestFunction;
};


TestFunction.prototype = {
  check: function (context) {
    return isTest(context);
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
