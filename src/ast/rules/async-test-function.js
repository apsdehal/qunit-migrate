var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isQUnitAsyncTest = require('../checks/is-qunit-async-test');
var isQUnitStart = require('../checks/is-qunit-start');
var isQUnitStop = require('../checks/is-qunit-stop');

module.exports = AsyncTestFunction;

// We don't need to take care of parameter assert in function
// Since it will be automatically added when this converts to
// QUnit.test by test-function-assert
function AsyncTestFunction() {
  this._property = constants.test;
  this._optionName =  optionNames.AsyncTestFunction;
};


AsyncTestFunction.prototype = {
  check: function (context) {
    return isQUnitAsyncTest(context);
  },

  update: function (context) {
    var _self = this;
    var node = context.node;

    node.callee = builder.memberExpression(
      builder.identifier(constants.qunit),
      builder.identifier(_self._property),
      false
    );

    if (node.arguments &&
        node.arguments[1] &&
        node.arguments[1].body &&
        node.arguments[1].body.body) {

      var statements = node.arguments[1].body.body;
      var len = statements.length;
      var stops = 0;
      var starts = 0;
      var expressionStatement;

      for(var i = 0; i < len; i++) {
        expressionStatement = statements[i];

        if (expressionStatement.type === 'ExpressionStatement') {

          if (isQUnitStop({node: expressionStatement.expression})) {
            statements[i] = this.getAssertAsyncDeclaration(stops);
            stops++;
          } else if (stops > starts &&
            isQUnitStart({node: expressionStatement.expression})) {
            statements[i] = this.getDoneCallExpression(starts);
            starts++;
          }
        }
      }
    }

    context.update(node);
  },

  getOptionName: function () {
    return this._optionName;
  },

  getAssertAsyncDeclaration: function (stops) {
    return builder.variableDeclaration(constants.varDeclarator, [
      builder.variableDeclarator(
        builder.identifier(
          constants.readyExpression + (stops ? stops : '')),
        builder.callExpression(
          builder.memberExpression(
            builder.identifier(constants.assert),
            builder.identifier(constants.asyncExpression),
            false),
          []))]);
  },

  getDoneCallExpression: function (starts) {
    return builder.expressionStatement(
      builder.callExpression(
        builder.identifier(
          constants.readyExpression + (starts ? starts : '')),
          []));
  }
};
