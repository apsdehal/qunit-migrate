// Async tests
QUnit.test("An async test", function( assert ) {
	var done = assert.async();
	done();
});

QUnit.test("A test", function( assert ) {
	var done = assert.async();
	var done1 = assert.async();
	done();
	done1();
});

QUnit.test("A test", function( assert ) {
	var done = assert.async();
	done();
});
