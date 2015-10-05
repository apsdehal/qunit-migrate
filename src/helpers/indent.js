var detectIndent = require('detect-indent');

// This function will return indent for next line
module.exports = function (line) {
	var indent = detectIndent(line);
	var indentString = '';
	var amount = indent.amount + 1;
	while(amount--) {
		indentString += indent.indent;;
	}

	return indentString;
}