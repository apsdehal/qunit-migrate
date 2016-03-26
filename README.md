# QUnit Migrate 
[![NPM Version](https://img.shields.io/npm/v/qunit-migrate.svg?style=flat)](https://www.npmjs.com/package/qunit-migrate)
[![Build Status](https://travis-ci.org/apsdehal/qunit-migrate.svg?branch=master)](https://travis-ci.org/apsdehal/qunit-migrate)

Migrate old QUnit code to 2.x.

## Features

- JSCS support
- Custom config support for defining rules
- Supports conversion of Async tests
- Support for globbing patterns
- Both regex and ast parser supported

## Install

> npm install --global qunit-migrate

## Usage

```
  qunit-migrate -h

  Usage: qunit-migrate [options] <file ...>

  QUnit Migrate: A tool to migrate your files to QUnit 2.0 API

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -c, --config <path>       Config file for qunit-migrate
    -P, --parser <regex|ast>  Parser to be used for parsing, Default: ast
    -w, --write               Pass if parsed files should be overwritten. Default: false
    -p, --preset <string>     Preset rule for jscs config. Default: jquery
    -j, --no-jscs             Pass if jscs fix should not be applied. Default: true

  Globbing is supported in files

  Examples:

    $ qunit-migrate "./**/*.js" -w --preset "google" -c "config.json"
    $ # This will migrate all js files in subdirectories using google
    $ # preset and config as config.json
```

*Information: AST parser is more robust than regex parser*


## Configuration

Various rules can be toggled through use of custom config which can be passed via `-c` option.

Default config file can be found [here](https://github.com/apsdehal/qunit-migrate/blob/master/examples/default.config.json)
Sample config file can be found [here](https://github.com/apsdehal/qunit-migrate/blob/master/examples/sample.config.json)

Config rules have been defined in [wiki]()

## Example:

qunit-migrate tries to change old QUnit code to new QUnit specifications.

For e.g. following code will be converted as follows:

```js
// Taken directly from jquery-globalize
// file1.js
define([
  "cldr",
  "src/core",
  "json!cldr-data/supplemental/likelySubtags.json",
  "cldr/event"
], function( Cldr, Globalize, likelySubtags ) {
Cldr.load( likelySubtags );
module( "Globalize.locale" );
ssyncTest( "should allow String locale", function() {
  stop();
  Globalize.locale( "en" );
  ok( Globalize.cldr instanceof Cldr );
  equal( Globalize.cldr.locale, "en" );
  start();
});
});
```
> $ qunit-migrate "file1" -d "lib/qunit" -q -w

to

```js
// Taken directly from jquery-globalize
// file1.js
define( [ "lib/qunit",
  "cldr",
  "src/core",
  "json!cldr-data/supplemental/likelySubtags.json",
  "cldr/event"
], function( QUnit, Cldr, Globalize, likelySubtags ) {
Cldr.load( likelySubtags );
QUnit.module( "Globalize.locale" );
QUnit.test( "should allow String locale", function( assert ) {
  var ready = assert.async();
  Globalize.locale( "en" );
  assert.ok( Globalize.cldr instanceof Cldr );
  assert.equal( Globalize.cldr.locale, "en" );
  ready();
});
});
```

## API
> $ npm install --save qunit-migrate

```js
var qunitMigrate = require('qunit-migrate');
var qmAst = qunitMigrate.ast;
var qmRegex = qunitMigrate.regex;
var data = 'Some old qunit code';

var modifiedDataAST = qmAst(data); // Fixed code through AST
var modifiedDataRegex = qmRegex(data); // Fixed code through AST
```

*Information: `qunit-migrate` api doesn't fix source with jscs*

## License

MIT © [Amanpreet Singh](https://apsdehal.in)
