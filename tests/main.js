var assertionsModifier = require('../src/modifiers/assertions');
var testsModifier = require('../src/modifiers/tests');
var globalsModifier = require('../src/modifiers/globals');
var definitionsModifier = require('../src/modifiers/definitions');
var asyncModifier = require('../src/modifiers/async');
var mainModifier = require('../src/main');
var assert = require('assert');
var fs = require('fs');
var noOfData = 11;

var oneToTenArray = [];
for(var i = 1; i <= noOfData; i++) {
  oneToTenArray.push(i);
}

var testData = oneToTenArray.map(function (i) {
  return fs.readFileSync('tests/data/' + i + '/actual.js').toString();
})

var expectedData = oneToTenArray.map(function (i) {
  return fs.readFileSync('tests/data/' + i + '/expected.js').toString();
})

describe('Assertions modules', function () {
  it('should have a working assertion modifier', function () {
    for (var i = 0; i < 1; i++) {
		  var result = assertionsModifier(testData[i]);
		  assert.equal(result, expectedData[i]);
    }
  });
});

describe('Tests modules', function () {
  it('should have a working tests modifier', function () {
    for (var i = 1; i < 2; i++) {
      var result = testsModifier(testData[i]);
      result = asyncModifier(result);
      assert.equal(result, expectedData[i]);
    }
  });
});

describe('Globals modules', function () {
  it('should have a working globals modifier', function () {
    for (var i = 2; i < 3; i++) {
      var result = globalsModifier(testData[i]);
      assert.equal(result, expectedData[i]);
    }
  });
});

describe('Definitions modules', function () {
  it('should have a working definitions modifier', function () {
    for (var i = 3; i < 6; i++) {
      var result = definitionsModifier(testData[i]);
      assert.equal(result, expectedData[i]);
    }
  });
});

describe('Main worker', function () {
  it('should have a working main worker', function () {
    var options = { definitions: false };
    for (var i = 6; i < 11; i++) {
      var result = mainModifier(testData[i], options);
      assert.equal(result, expectedData[i])
      if (i == 6) {
        options.definitions = true;
      }
      if (i == 8) {
        options.definitions = 'lib/qunit';
      }
      if (i == 9) {
        options.quotes = '"';
      }
    }
  });
});
