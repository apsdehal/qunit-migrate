var builder = require('recast').types.builders;
var constants = require('../constants');
var path = require('path');
var utils = require('../utils');
var optionNames = require('../option-names');
var isInit = require('../checks/is-init');

module.exports = InitFunction;

function InitFunction() {
  this._optionName =  optionNames.InitFunction;
};


InitFunction.prototype = {
  check: function (context) {
    return isInit(context);
  },

  update: function (context) {
    var _self = this;
    context.parent.remove();
  },

  getOptionName: function () {
    return this._optionName;
  }
};
