module.exports = function (data) {
  var globals = [
    "begin", "done", "log",
    "testStart", "testDone",
    "moduleStart", "moduleDone"
  ];
  var qunitPrefix = 'QUnit.';
  var result = data;

  globals.map(function (global) {
    var regex = new RegExp('\^' + global + '\\(', 'g');
    var replacement = qunitPrefix + global + '(';
    result = result.split('\n').map(function (x) {
      return x.replace(regex, replacement);
    }).join('\n');
  });

  return result;
}
