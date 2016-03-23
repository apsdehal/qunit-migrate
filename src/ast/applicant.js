var defaultConfig = require('config/default-config');
var Generator = require('config/generator');

module.exports = Applicant;


function Applicant() {
  this._generator = new Generator(defaultConfig);
  this._rules = this._generator.getRules;
}


Applicant.prototype.apply = function (node) {
  var _self = this;

  Object.keys(this._rules).forEach(function (rule) {
    var _ruleInstance = _self._rules[rule];

    if (_ruleInstance.check(node)) {
      node = _ruleInstance.update(node);
    }
  });

  return node;
};
