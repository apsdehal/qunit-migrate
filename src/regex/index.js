var main = require('./main');
var extend = require('extend');
var defaultOptions =  {
	definitions: false,
  quotes: '"'
};

module.exports = function (data, options) {
  var regexOptions = options.parserConfig.regex || {};

  var finalOptions = extend(options, regexOptions);
	var migrated = main(data.toString(), finalOptions);
  return migrated;
}

