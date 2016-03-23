var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');

module.exports = QUnitPropertyBaseRule;

function QUnitPropertyBaseRules(property) {
  this._property = property;
  this._optionName = optionName || this._getOptionsNameFromFileName();
};


QUnitPropertyBaseRule.prototype = {
  _check: function (node) {
    return node.type === 'Identifier' && node.name === this._property;
  },

  _update: function (node) {
    var _self = this;
    return

    builder.memberExpression(
      builder.identifier(constants.qunit),
      builder.identifier(self._property),
      false
    );
  },

  _getOptionsNameFromFileName: function () {
    var ruleName = path.basename(__filename);
    return utils.getCamelCaseFromHyphenedName(ruleName);
  },

  getOptionName: function () {
    return this._optionName;
  }
};
