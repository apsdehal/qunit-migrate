# Config options for AST parser

All these options are set true by default

### anonymousFunction

If anonymous function definitions should be prepended with QUnit

### assertionFunction

If assertions should be prepended with `assert.`. For e.g. `equal` with `assert.equal`.

### assertPushFunction

If `QUnit.push` in QUnit.assert additions should be replaced `this.push`

### asyncTestFunction

If `asyncTest` definitions should be fixed.

### defineFunction

If requirejs definitions should be fixed and require proper qunit. You might want to disable if you already require qunit

### initFunction

If you want migrator to remove `QUnit.init` from code

### jsDumpFunction

If you want `QUnit.jsDump.parse` to be replaced by `QUnit.dump.parse`

### moduleFunction

If you want `module` to be replaced by `QUnit.module`

### moduleFunctionParams

If you want `setup` and `teardown` should be replaced by `beforeEach` and `afterEach`

### moduleFunctionParamsValue

If you want `assert` to function parameters of `beforeEach` and `afterEach`. You might want to disable this if you don't use `assert` in these functions.

### reporterFunction

If `begin`, `done`, `log`, `moduleDone`, `moduleStart`, `testDone`, `testStart` should be appended with `QUnit.`.

### reporterFunctionCallback

If reporter functions' callback which is in `StatementExpression` should be replaced with callback type expression.

### startFunction

If `start` function should be replaced with `QUnit.start`, given it was already not replaced by `asyncTestFunction`

### testFunction

If `test` should be replaced with `QUnit.test`

### testFunctionAssert

If `assert` should be added as a parameter to `test` function's callback
