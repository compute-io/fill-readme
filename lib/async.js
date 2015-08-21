'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' ),
	fs = require( 'fs' ),
	noop = require( '@kgryte/noop' ),
	path = require( 'path' ),
	execute = require( './execute.js' );


/**
* FUNCTION fill( dir[, clbk] )
*	Inserts asynchronously comments into the README.md file of a directory.
*
* @param {String} dir - directory name which holds README.md file
* @param {Function} [clbk] - callback to invoke upon attempting to overwrite README.md file
*/
function fill( dir, clbk ) {

	var dirPath,
		readmePath;

	if ( !isString( dir ) ) {
		throw new TypeError( 'fill()::insufficient input argument. Directory argument must be a string primitive.' );
	}
	if ( arguments.legth === 1 ) {
		clbk = noop;
	}
	else {
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'fill()::invalid input argument. Second argument must be a callback function. Value: `' + clbk + '`.' );
		}
	}

	dirPath = path.resolve( dir );
	readmePath = path.join( dirPath, '/README.md' );

	fs.readFile( readmePath, {'encoding':'utf8'}, onRead );

	/**
	* FUNCTION: onRead( error, data )
	*	Callback invoked upon reading a file.
	*
	* @private
	* @param {Error} error - error object
	* @param {String} data - file contents
	*/
	function onRead( error, data ) {
		var code, newCode,
			str,
			codeBlockRegExp,
			codeBlock,
			mainPath,
			pkgName;

		if ( error ) {
			throw error;
		}
		str = data.toString();

		pkgName = str.match( /require\( '(compute-[A-Za-z\-]+)' \)/ );

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

		fs.writeFile( readmePath, str, onWrite );
	} // end FUNCTION onRead()


	/**
	* FUNCTION: onWrite( error )
	*	Callback invoked upon writing a file.
	*
	* @private
	* @param {Error} error - error object
	*/
	function onWrite( error ) {
		if ( error ) {
			return clbk( error );
		}
		clbk();
	} // end FUNCTION onWrite()

} // end FUNCTION fill()

// EXPORTS //

module.exports = fill;
