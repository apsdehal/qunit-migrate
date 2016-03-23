var path = require('path');
var fs = require('fs');
var utils = require('../utils');

module.exports = ConfigGenerator;


function ConfigGenerator(config) {
  this._rules = [];

  this.registerDefaultRules();

  var rulesLen = this._rules.length;

  Object.keys(this._rules).forEach(function (prop) {
    if (this._rules.hasOwnProperty(prop) && !config[prop]) {
      delete this._rules[prop];
    }
  });
};


ConfigGenerator.prototype.getRules = function () {
  return this,_rules;
};

ConfigGenerator.prototype.registerDefaultRules = function () {
    var dir = path.join(__dirname, '../rules');

    fs.readdirSync(dir).forEach(function(rule) {
        this.registerRule(
            require(path.join(dir, rule))
        );
    }, this);
};

ConfigGenerator.prototype.registerRule = function (rule) {
    if (typeof rule === 'function') {
        var RuleClass = rule;
        rule = new RuleClass();
    }

    var optionName = rule.getOptionName();
    assert(!this._rules.hasOwnProperty(optionName), 'Rule "' + optionName + '" is already registered');
    this._rules[optionName] = rule;
};
