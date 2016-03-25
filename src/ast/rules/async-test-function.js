var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isAsyncTest = require('../checks/is-async-test');

module.exports = AsyncTestFunction;

// We don't need to take care of parameter assert in function
// Since it will be automatically added when this converts to
// QUnit.test by test-function-assert
function AsyncTestFunction() {
  this._property = constants.test;
  this._optionName =  optionNames.AsyncTestFunction;
};


AsyncTestFunction.prototype = {
  check: function (context) {
    return isAsyncTest(context);
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
