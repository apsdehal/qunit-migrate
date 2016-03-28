var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isAnonymous = require('../checks/is-anonymous');

module.exports = AnonymousFunction;

function AnonymousFunction() {
  this._optionName =  optionNames.AnonymousFunction;
};


AnonymousFunction.prototype = {
  check: function (context) {
    return isAnonymous(context);
  },

  update: function (context) {
    var _self = this;
    var node = context.node;

    var params = node.expression.callee.params;
    var paramLength = params.length;

    for(var i = 0; i < paramLength; i++) {
      var param = params[i];
      if (param.type === 'Identifier' && param.name === constants.qunit) {
        return;
      }
    }

    params.unshift(builder.identifier(constants.qunit));
    node.expression.arguments.unshift(builder.identifier(constants.qunit));
    context.update(node);
  },

  getOptionName: function () {
    return this._optionName;
  }
};
