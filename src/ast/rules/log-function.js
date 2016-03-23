var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');

module.exports = LogFunction;

function LogFunction() {
  this._property = constants.log;
  this._optionName =  optionNames.LogFunction;
};


LogFunction.prototype = {
  check: function (node) {
    return  node.type === "CallExpression" &&
            node.callee &&
            node.callee.type === "Identifier" &&
            node.callee.name === this._property;
  },

  update: function (node, treeHandle) {
    var _self = this;
    node.callee = builder.memberExpression(
      builder.identifier(constants.qunit),
      builder.identifier(_self._property),
      false
    );
    return node;
  },

  getOptionName: function () {
    return this._optionName;
  }
};
