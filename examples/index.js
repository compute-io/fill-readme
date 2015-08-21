'use strict';

var fillReadme = require( './../lib' ),
	fs = require( 'fs-extra' );

fs.copySync( './examples/_README.md', './examples/sqrt/README.md' );

fillReadme( './examples/sqrt', function onCompletion() {
	fs.readFile( './examples/sqrt/README.md', 'utf-8', function onRead( error, file ) {
		console.log( file );
	});
});
