var assertionModifiers = require('../src/modifiers/assertions');
var assert = require('assert');
var fs = require('fs');
var noOfData = 1;

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
		for(var i = 0; i < noOfData; i++) {
			var result = assertionModifiers(testData[i]);
			assert.equal(result, expectedData[i]);
		}
	});
});

