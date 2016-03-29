var main = require('./main');
var extend = require('extend');
var defaultOptions =  {
	definitions: false,
  quotes: '"'
};

module.exports = function (data, options) {
  options = options || {};
  options.parserConfig = options.parserConfig || {};
  var regexOptions = options.parserConfig.regex || {};

  var finalOptions = extend(options, regexOptions);
	var migrated = main(data.toString(), finalOptions);
  return migrated;
}

