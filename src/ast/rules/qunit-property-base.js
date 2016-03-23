var builder = require('recast').types.builders;
var constants = require('../constants');

module.exports = QUnitPropertyBaseRule;

function QUnitPropertyBaseRule (property) {
  this._property = property
};


QUnitPropertyBaseRule.prototype = {
  _check: function (node) {
    return node.type === 'Identifier' && node.name === this._property
  },

  _update: function (node) {
    var _self = this;
    return

    builder.memberExpression(
      builder.identifier(constants.qunit),
      builder.identifier(self._property),
      false
    );
  }
}
