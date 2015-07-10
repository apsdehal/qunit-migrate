# QUnit Migrate [![Build Status](https://travis-ci.org/apsdehal/qunit-migrate.svg?branch=master)](https://travis-ci.org/apsdehal/qunit-migrate)

Migrate old QUnit code to 2.x

## Install

> npm install --global qunit-migrate

## Usage

> $ qunit-migrate "file1, file2, file3" -d "lib/qunit" -q -w

__-w__: If you want to write the output to file, default: false

__-d__: If you want definitions support, this will try to add QUnit deps to AMD definitions and anonymous requires. You can also pass your custom dep instead of qunit like in the example case we are passing lib/qunit. So dep will be added as lib/qunit instead of qunit in requires. Keep in mind, qunit-migrate currently doesn't check if qunit definition is already present or not.

__-q__: If you want double quoutes support, by default we convert to single quotes

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
test( "should allow String locale", function() {
	Globalize.locale( "en" );
	ok( Globalize.cldr instanceof Cldr );
	equal( Globalize.cldr.locale, "en" );
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
	Globalize.locale( "en" );
	assert.ok( Globalize.cldr instanceof Cldr );
	assert.equal( Globalize.cldr.locale, "en" );
});
});
```

## API
> $ npm install --save qunit-migrate

```js
var qunitMigrate = require('qunit-migrate');
var data = 'Some old qunit code';
var options = {
	quotes: '"', // Kind of quotes you want
	definitions: true // or you can pass your custom definition
};
var modifiedData = qunitMigrate(data, options); // Fixed code
```

## License

MIT © [Amanpreet Singh](https://apsdehal.in)
