var assertionsModifier = require('../src/modifiers/assertions');
var testsModifier = require('../src/modifiers/tests');
var globalsModifier = require('../src/modifiers/globals');
var assert = require('assert');
var fs = require('fs');
var noOfData = 3;

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
		for(var i = 0; i < 1; i++) {
			var result = assertionsModifier(testData[i]);
			assert.equal(result, expectedData[i]);
		}
	});
});

describe('Tests working', function () {
	it('should have a workign tests modifier', function () {
		for(var i = 1; i < 2; i++) {
			var result = testsModifier(testData[i]);
			assert.equal(result, expectedData[i]);
		}
	});
});

describe('Globals working', function () {
	it('should have a workign tests modifier', function () {
		for(var i = 2; i < 3; i++) {
			var result = globalsModifier(testData[i]);
			assert.equal(result, expectedData[i]);
		}
	});
});
