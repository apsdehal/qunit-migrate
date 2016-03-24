var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isReporterCallbackExpression = require('../checks/is-reporter-callback-expression');

module.exports = ReporterFunctionCallback;

function ReporterFunctionCallback() {
  this._property = constants.log;
  this._optionName =  optionNames.ReporterFunctionCallback;
};


ReporterFunctionCallback.prototype = {
  check: function (context) {
    return isReporterCallbackExpression(context);
  },

  update: function (context) {
    var node = context.node;
    var _self = this;
    node = builder.callExpression(
        node.left,
        [node.right]);

    context.update(node);
  },

  getOptionName: function () {
    return this._optionName;
  }
};
