module.exports = function (data) {
  var tests = [ 'test', 'asyncTest' ];
  var qunitPrefix = 'QUnit.';
  var result = data;
  var functionRegex = new RegExp('function' +'\\s*' + '\\(\\)');
  var functionReplacement = 'function( assert )';

  tests.map(function (test) {
    var regex = new RegExp('\^' + test + '\\(');
    var regexWithoutStart = new RegExp(test + '\\(');
    var replacement = qunitPrefix + test + '(';
    result = result.split('\n').map(function (x) {
      var stripped = x.trim();
      if (regex.test(stripped)) {
        x = x.replace(functionRegex, functionReplacement);
        x = x.replace(regexWithoutStart, replacement);
      }
    	return x;
    }).join('\n');
  });

  return result;
}
