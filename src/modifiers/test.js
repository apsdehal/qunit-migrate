module.exports = function (data) {
	var tests = [ 'test', 'asyncTest' ];
	var qunitPrefix = 'QUnit.';
	var result = data;
	var functionRegex = new RegExp('function\s?()', 'g');
	var functionReplacement = 'function( assert )';

	tests.map(function (test) {
		var regex = new RegExp('\^' + test + '\\(', 'g');
		var replacement = qunitPrefix + assertion + '(';
		result = result.split('\n').map(function (x) {
			if (regex.test(x)) {
				x = x.replace(functionRegex, functionReplacement);
			}
			return x.replace(regex, replacement);
		}).join('\n');
	});

	return result;
}
