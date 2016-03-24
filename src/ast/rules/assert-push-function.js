var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isAssertPush = require('../checks/is-assert-push');

module.exports = AssertPushFunction;

function AssertPushFunction() {
  this._property = constants.module;
  this._optionName =  optionNames.AssertPushFunction;
};


AssertPushFunction.prototype = {
  check: function (context) {
    return isAssertPush(context);
  },

  update: function (context) {
    var _self = this;
    var node = context.node;
    node.object.name = constants.thisObject;
  },

  getOptionName: function () {
    return this._optionName;
  }
};
