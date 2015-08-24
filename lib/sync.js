'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	fs = require( 'fs' ),
	path = require( 'path' ),
	execute = require( './execute.js' ),
	validateCode = require( './validateCode.js' );


/**
* FUNCTION fill( dir )
*	Inserts synchronously comments into the README.md file of a directory.
*
* @param {String} dir - directory name which holds README.md file
*/
function fill( dir ) {

	if ( !isString( dir ) ) {
		throw new TypeError( 'fill()::insufficient input argument. Directory argument must be a string primitive.' );
	}

	var code, newCode,
		data,
		str,
		codeBlockRegExp,
		codeBlock,
		mainPath,
		dirPath,
		readmePath,
		pkgName;

	dirPath = path.resolve( dir );
	readmePath = path.join( dirPath, '/README.md' );

	data = fs.readFileSync( readmePath, {'encoding':'utf8'} );
	str = data.toString();

	pkgName = str.match( /require\( '(compute-[A-Za-z0-9_.\-]+)' \)/ );

	// Replace module name with local path
	mainPath = path.join( dirPath, '/lib/index.js' );
	str = str.replace( new RegExp( pkgName[ 1 ], 'g' ), mainPath );

	codeBlockRegExp = /```[\s]{0,1}javascript([^`]+)```/gm;

	// Statements which loads the module...
	var loadCommand = codeBlockRegExp.exec( str )[ 1 ];

	while ( ( codeBlock = codeBlockRegExp.exec( str ) ) !== null ) {
		code = codeBlock[ 1 ];
		newCode = execute( code, loadCommand );
		str = str.replace( code, newCode );
	}

	// Replace local path with compute module name
	str = str.replace( new RegExp( mainPath, 'g' ), pkgName[ 1 ] );

	fs.writeFileSync( readmePath, str );

} // end FUNCTION fill()


// EXPORTS //

module.exports = fill;
