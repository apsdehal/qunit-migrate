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

test( "should allow Cldr instance to be passed as locale", function() {
	Globalize.locale( new Cldr( "pt" ) );
	ok( Globalize.cldr instanceof Cldr );
	equal( Globalize.cldr.locale, "pt" );
});

});
