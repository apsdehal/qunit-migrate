module.exports = function (data) {
  var globals = [
    "begin", "done", "log",
    "testStart", "testDone",
    "moduleStart", "moduleDone",
    "module", "start", "stop"
  ];
  var qunitPrefix = 'QUnit.';
  var result = data;

  globals.map(function (global) {
    var regex = new RegExp('\^' + global + '\\(');
    var regexWithoutStart = new RegExp(global + '\\(');
    var replacement = qunitPrefix + global + '(';
    result = result.split('\n').map(function (x) {
      var stripped = x.trim();
      if (regex.test(stripped)) {
        x = x.replace(regexWithoutStart, replacement);
      }
      return x;
    }).join('\n');
  });

  return result;
}
