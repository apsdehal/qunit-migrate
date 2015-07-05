# QUnit Migrate [![Build Status](https://travis-ci.org/apsdehal/qunit-migrate.svg?branch=master)](https://travis-ci.org/apsdehal/qunit-migrate)

Migrate old QUnit code to 2.x

## Install

> npm install --global qunit-migrate

## Usage

> qunit-migrate "file1, file2, file3" -d -q -w

__-w__: If you want to write the output to file, default: false

__-d__: If you want definitions support, this will try to add QUnit deps to AMD definitions and anonymous requires. Keep in mind, qunit-migrate currently doesn't check if qunit definition is already present or not.

__-q__: If you want double quoutes support, by default we convert to single quotes

## Example:

qunit-migrate tries to change old QUnit code to new QUnit specifications.

For e.g. following code will be converted as follows:

```js
// Taken directly from jquery-globalize
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
to

```js
// Taken directly from jquery-globalize
define([ 'qunit',
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
