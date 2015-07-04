module.exports = function (data) {
  var qunitString = 'QUnit';
  var result = data;
  result = result.split('\n');
  var defineResults = testDefine(result);
  if (defineResult.found) {
    return defineResult.result;
  }
  var anonResults = testAnon(result);
  if (anonResults.found) {
    return anonResults.result;
  }
}

var replacement = 'define( [\'qunit\'\n';

function testDefine(data) {
  var regex = new RegExp('\^' + 'define\\(', 'g');
  var depsRegex = new RegExp('\[');
  var functionRegex = new RegExp('function\\s*(');
  var noDefinition = new RegExp('\^' + 'define\\(\\s*\[');
  var depsToBeFound = false;
  var qunitDepToBeInserted = false;
  var foundDefine = false;

  var result = data.map(function (x) {
    if (regex.test(x)) {
      foundDefine = true;
      if (noDefinition.test(x)) {
        x = x.replace(noDefinition, replacement);
        qunitDepToBeInserted = true;
      } else {
        depsToBeFound = true;
      }
    }

    if (depsToBeFound) {
      if (depsRegex.test(x)) {
        x = x.replace(depsRegex, '[\'qunit\'\n');
        qunitDepToBeInserted = true;
        depsToBeFound = false;
      }
    }

    if (qunitDepToBeInserted) {
      if (functionRegex.test(x)) {
        x = x.replace(functionRegex, 'function ( QUnit, ');
          qunitDepToBeInserted = false;
      }
    }
    return x;
  }).join('\n');

  return { result: result, found: foundDefine };
}
