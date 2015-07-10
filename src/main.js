var assertionsModifier = require('./modifiers/assertions');
var definitionsModifier = require('./modifiers/definitions');
var globalsModifier = require('./modifiers/globals');
var testsModifier = require('./modifiers/tests');

module.exports = function (data, options) {
  data = assertionsModifier(data);
  data = globalsModifier(data);
  data = testsModifier(data);

  if (options.definitions) {
  	data = definitionsModifier(data, options.definitions);
  }

  return data;
}
