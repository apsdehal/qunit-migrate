var defaultConfig = require('./config/default-config');
var Generator = require('./config/generator');
var extend = require('extend');

module.exports = Applicant;

function Applicant(config) {
  config = config || {};
  config = extend(defaultConfig, config);
  this._generator = new Generator(config);
  this._rules = this._generator.getRules();
}


Applicant.prototype.apply = function (context) {
  Object.keys(this._rules).forEach(function (rule) {
    var _ruleInstance = this._rules[rule];
    if (_ruleInstance.check(context)) {
      node = _ruleInstance.update(context);
    }
  }, this);
};
