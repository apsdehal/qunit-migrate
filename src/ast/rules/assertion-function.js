var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isAssertion = require('../checks/is-assertion');

module.exports = AssertionFunction;

function AssertionFunction() {
  this._property = constants.module;
  this._optionName = optionNames.AssertionFunction;
};


AssertionFunction.prototype = {
  check: function (context) {
    return isAssertion(context);
  },

  update: function (context) {
    var node = context.node;
    node = builder.memberExpression(
      builder.identifier(constants.assert),
      builder.identifier(node.name)
    );

    context.update(node);
  },

  getOptionName: function () {
    return this._optionName;
  }
};
