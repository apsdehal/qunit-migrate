var Queue = require('../helpers/queue');
var Indent = require('../helpers/indent');

module.exports = function (data) {
  var test = 'QUnit.asyncTest';
  var testReplacement = 'QUnit.test';
  var doneString = 'done';
  var result = data;
  result = result.split('\n');

  var regex = new RegExp('\^' + test);
  var regexWithoutStart = new RegExp(test);
  var openingBracketsRegex = new RegExp('\\{');
  var closingBracketsRegex = new RegExp('\\}');
  var functionRegex = new RegExp('function\\( assert \\)');
  
  // We have generalized all kind of stops, starts by
  // passing them through global modifier
  var asyncStopRegex = new RegExp('QUnit\\.stop\\(\\)');
  var asyncStartRegex = new RegExp('QUnit\\.start\\(\\)');
  
  var bracketsQueue = new Queue();

  for(var i = 0; i < result.length; i++) {
    var x = result[i];
    var stripped = x.trim();
    if (regex.test(stripped)) {
      x = x.replace(regexWithoutStart, testReplacement);

      result[i] = x;

      if (!functionRegex.test(stripped)) {
        continue;        
      }
      // Get indent for line next to the starting line
      var indent = Indent(x);


      foundFirstBracket = false;
      var top = null;
      var numberOfStarts = 0;
      var donePrefix = 'done';
      var originalI = i;

      // Finding number of calls to start()
      while(top !== null || foundFirstBracket === false) {
        var hasOpeningBrackets = openingBracketsRegex.test(stripped);

        if (hasOpeningBrackets) {
          bracketsQueue.enqueue('{');
          if (top === null) {
            foundFirstBracket = true;
          }
        } 

        var hasClosingBrackets = closingBracketsRegex.test(stripped);        
        
        if (hasClosingBrackets) {
          bracketsQueue.dequeue();
        }

        // Remove any stop call found 
        if (asyncStopRegex.test(stripped)) {
          x = x.replace(asyncStopRegex, '');
        }

        if (asyncStartRegex.test(stripped)) {
          x = x.replace(asyncStartRegex, 
            donePrefix + (numberOfStarts ? numberOfStarts : '') + '()');
          numberOfStarts++;
        }

        // Set new top
        var top = bracketsQueue.top();

        // Set result back
        result[i] = x;
        i++;
        x = result[i];
        stripped = x.trim();
      }

      var doneStringToBeAppended = '';
      var counter = 0;
      while(counter < numberOfStarts) {
        doneStringToBeAppended += 
        indent + 'var done' + 
        (counter ? counter : '') + ' = assert.async();';
        counter++;
      }

      if (doneStringToBeAppended.length > 0) {
        result.splice(originalI+1, 0, doneStringToBeAppended);
        // Since we added an element to array, current i needs to be
        // updated
        i++;
      }

    }
  }

  return result.join('\n');
}