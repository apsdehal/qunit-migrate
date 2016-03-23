var path = require('path');
var fs = require('fs');
var utils = require('../utils');

module.exports = ConfigGenerator;


function ConfigGenerator(config) {
  this._rules = [];

  Object.keys(config).forEach(function (key) {
    if (config[key] === false) {
      delete this._rules[key];
    }
  });
};

ConfigGenerator.prototype.registerDefaultRules = function() {
    var dir = path.join(__dirname, '../rules');

    fs.readdirSync(dir).forEach(function(rule) {
        this.registerRule(
            require(path.join(dir, rule))
        );
    }, this);
};

ConfigGenerator.prototype.registerRule = function(rule) {
    if (typeof rule === 'function') {
        var RuleClass = rule;
        rule = new RuleClass();
    }

    var optionName = rule.getOptionName();
    assert(!this._rules.hasOwnProperty(optionName), 'Rule "' + optionName + '" is already registered');
    this._rules[optionName] = rule;
};
