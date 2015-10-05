var detectIndent = require('detect-indent');

module.exports = function (line) {
	var indent = detectIndent(line);
	var indentString = '';
	while(indent--) {
		indentString += '\t';
	}

	return indentString;
}