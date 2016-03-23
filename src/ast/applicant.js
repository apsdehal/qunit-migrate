var defaultConfig = require('./config/default-config');
var Generator = require('./config/generator');

module.exports = Applicant;


function Applicant() {
  this._generator = new Generator(defaultConfig);
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
