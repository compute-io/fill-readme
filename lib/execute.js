/*
No strict module to allow leakage of eval statements into parent scope.
*/
/*jshint strict: false */

// MODULES //

var includes = require( './includes.js' ),
	toString = require( './toString.js' );


// EXECUTE CODE //

/**
* FUNCTION execute( code, loadCommand )
*	Execute README.md code block and inject result comments.
*
* @param {String} code - code block
* @param {String} loadCommand - code to load package(s)
* @returns {String} code with added comments
*/
function execute( _code, _loadCommand ) {
	// Disable JSHINT warning about `eval` usage:
	/*jshint -W061 */

	/*
	prefix variable names with _ to ensure that there are no overlaps with
	the variable declarations in the evaluated code.
	*/
	var _match,
		_returned,
		_statements,
		_tabs,
		_txt,
		_variable,
		_i;

	// Ensure package is available to `eval`...
	eval( _loadCommand );

	_statements = _code
		// Split code block on semicolons, don't throw aray the separator...
		.split( /(.*;[\n]*)/g )
		// Filter away empty strings...
		.filter( function( val ) {
			return val !== '';
		});

	for ( _i = 0; _i < _statements.length; _i++ ) {
		_txt = _statements[ _i ];
		if ( includes( _txt, '// returns;' ) === true ) {
			// `// returns` indicates that code comment shall be inserted...

			// [0] regexp to find last variable to which a value was assigned
			_match = /(?:var ){0,1}([\w]+) = /.exec( _statements[ _i - 1 ] );
			if ( _match ) {
				_variable = _match[ 1 ];
				// [1] get the value
				_returned = eval( _variable );
				// [2] produce suitable string representation of the variable
				_tabs = _txt.replace( /[^\t]/g, '' );
				_statements[ _i ] = toString( _returned, _tabs.length ) + '\n\n';
			}
		} else {
			/*
				if not a return command, try to evaluate the statement. if an error
				is thrown, the statement is (likely) not finished yet and so append the
				current statement to the next...
			*/
			try {
				eval( _txt );
			} catch( err ) {
				_statements[ _i + 1 ] = _statements[ _i ].concat( _statements[ _i + 1 ] );
				_statements[ _i ] = '';
			}
		}
	}
	return _statements.join( '' );
} // end FUNCTION execute()


// EXPORTS //

module.exports = execute;
