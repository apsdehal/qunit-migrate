var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isDefine = require('../checks/is-define');

module.exports = DefineFunction;

function DefineFunction() {
  this._optionName =  optionNames.DefineFunction;
};


DefineFunction.prototype = {
  check: function (context) {
    return isDefine(context);
  },

  update: function (context) {
    var _self = this;
    var node = context.node;
    var argLen = node.expression.arguments.length;
    var args = node.expression.arguments;
    var hasArray = 0, hasFunction = 0, hasLiteral = 0;

    for(var i = 0; i < argLen; i++) {
      var arg = args[i];
      if (arg.type === 'ArrayExpression') {
        arg.elements.unshift(builder.literal(constants.qunitSmallExpression));
        hasArray = 1;
      } else if (arg.type === 'FunctionExpression') {
        arg.params.unshift(builder.identifier(constants.qunit));
        hasFunction = 1;
      } else if (arg.type === 'Literal') {
        hasLiteral = 1;
      }
    }

    if (hasFunction && !hasArray) {
      var arrayExpression = builder.arrayExpression([builder.literal(constants.qunitSmallExpression)])
      if (hasLiteral) {
        args.splice(1, 0, arrayExpression);
      } else {
        args.unshift(arrayExpression);
      }
    }

    context.update(node);
  },

  getOptionName: function () {
    return this._optionName;
  }
};
