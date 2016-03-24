var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isReporter = require('../checks/is-reporter');

module.exports = ReporterFunction;

function ReporterFunction() {
  this._optionName =  optionNames.ReporterFunction;
};


ReporterFunction.prototype = {
  check: function (context) {
    return isReporter(context);
  },

  update: function (context) {
    var node = context.node;

    node = builder.memberExpression(
      builder.identifier(constants.qunit),
      builder.identifier(node.name),
      false
    );
    context.update(node);
  },

  getOptionName: function () {
    return this._optionName;
  }
};
