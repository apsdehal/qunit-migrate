// Async tests
QUnit.test("An async test", function(assert) {
    var ready = assert.async();
    ready();
});

QUnit.test("A test", function(assert) {
    var ready = assert.async();
    var ready1 = assert.async();
    ready();
    ready1();
});

QUnit.test("A test", function(assert) {
    var ready = assert.async();
    ready();
});
