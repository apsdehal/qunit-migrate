var assertionsModifier = require('./modifiers/assertions');
var definitionsModifier = require('./modifiers/definitions');
var globalsModifier = require('./modifiers/globals');
var testsModifier = require('./modifiers/tests');
var asyncModifier = require('./modifiers/async');

module.exports = function (data, options) {
  data = assertionsModifier(data);
  data = globalsModifier(data);
  data = testsModifier(data);
  data = asyncModifier(data);

  if (options.definitions) {
  	data = definitionsModifier(data, options);
  }

  return data;
}
