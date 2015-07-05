module.exports = function (data) {
  var qunitString = 'QUnit';
  var result = data;
  result = result.split('\n');
  var defineResults = testDefine(result);
  if (defineResults.found) {
    return defineResults.result;
  }
  var anonResults = testAnon(result);
  if (anonResults.found) {
    return anonResults.result;
  }
}

var replacementDefine = 'define( [ \'qunit\'\,';
var replacementAnonStart = '( function( QUnit,';
var replacementAnonEnd = '})( QUnit, ';

function testDefine(data) {
  var regex = new RegExp('\^' + 'define\\(');
  var regexWithoutStart = new RegExp('define\\(');
  var depsRegex = new RegExp('\\[\n*');
  var functionRegex = new RegExp('function\\s*\\(');
  var noDefinition = new RegExp('\^' + 'define\\(\\s*\\[');
  var noDefinitionWithoutStart = new RegExp('define\\(\\s*\\[');
  var depsToBeFound = false;
  var qunitDepToBeInserted = false;
  var foundDefine = false;

  var result = data.map(function (x) {
    var stripped = x.trim();
    if (!foundDefine) {
      if (regex.test(stripped)) {
        foundDefine = true;
        if (noDefinition.test(x)) {
          x = x.replace(noDefinitionWithoutStart, replacementDefine);
          qunitDepToBeInserted = true;
        } else {
          depsToBeFound = true;
        }
      }
    }

    if (depsToBeFound) {
      if (depsRegex.test(x)) {
        x = x.replace(depsRegex, '[ \'qunit\'\,');
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

function testAnon(data) {
  var regex = new RegExp('\^' + '\\(\\s*function\\s*\\(');
  var matchAnonRegex = new RegExp('\\}\\)\\(\\s*');
  var matchAnonToBeFound = false;
  var foundAnon = false;
  var result = data.map(function (x) {
    if (!foundAnon) {
      if (regex.test(x)) {
        x = x.replace(regex, replacementAnonStart);
        matchAnonToBeFound = true;
        foundAnon = true;
      }

    }
    if (matchAnonToBeFound) {
      if (matchAnonRegex.test(x)) {
        x = x.replace(matchAnonRegex, replacementAnonEnd);
        matchAnonToBeFound = false;
      }
    }
    return x;
  }).join('\n');

  return { result: result, found: foundAnon };
}
