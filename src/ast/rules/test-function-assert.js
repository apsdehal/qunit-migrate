var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isTestFunctionParams = require('../checks/is-test-params');

module.exports = TestFunctionAssert;

function TestFunctionAssert() {
  this._property = constants.module;
  this._optionName =  optionNames.TestFunctionAssert;
};


TestFunctionAssert.prototype = {
  check: function (context) {
    return isTestFunctionParams(context);
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
