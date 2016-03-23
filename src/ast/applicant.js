var defaultConfig = require('./config/default-config');
var Generator = require('./config/generator');

module.exports = Applicant;


function Applicant() {
  this._generator = new Generator(defaultConfig);
  this._rules = this._generator.getRules();
}


Applicant.prototype.apply = function (node) {
  var flag = 0;
  Object.keys(this._rules).forEach(function (rule) {
    var _ruleInstance = this._rules[rule];
    if (_ruleInstance.check(node)) {
      flag = 1;
      node = _ruleInstance.update(node);
    }
  }, this);

  return { node: node, flag: flag };
};
