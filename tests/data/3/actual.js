// Async tests
asyncTest("An async test", function () {
	start();
});

asyncTest("A test", function () {
	stop();
	stop();
	start();
	start();
});

asyncTest("A test", function () {
	stop();
	start();
});
