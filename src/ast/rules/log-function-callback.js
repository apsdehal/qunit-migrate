var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isLogCallbackExpression = require('../checks/is-log-callback-expression');

module.exports = LogFunctionCallback;

function LogFunctionCallback() {
  this._property = constants.log;
  this._optionName =  optionNames.LogFunctionCallback;
};


LogFunctionCallback.prototype = {
  check: function (context) {
    return isLogCallbackExpression(context);
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
