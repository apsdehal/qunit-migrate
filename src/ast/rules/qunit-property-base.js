var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');

module.exports = QUnitPropertyBaseRule;

function QUnitPropertyBaseRule(property, optionName) {
  this._property = property;
  this._optionName =  optionName;
};


QUnitPropertyBaseRule.prototype = {
  check: function (node) {
    return node.type === 'Identifier' && node.name === this._property;
  },

  update: function (node, treeHandle) {
    var _self = this;
    treeHandle.skip();
    return builder.memberExpression(
      builder.identifier(constants.qunit),
      builder.identifier(_self._property),
      false
    );
  },

  getOptionName: function () {
    return this._optionName;
  }
};
