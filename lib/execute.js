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
* @param {String} loadCommand - code to load package
* @returns {String} code with added comments
*/
function execute( _code, _loadCommand ) {
	// Disable JSHINT warning about `eval` usage:
	/*jshint -W061 */
	var _match,
		_returned,
		_statements,
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
		if ( includes( _txt, '// returns' ) === true ) {
			_match = /(?:var ){0,1}([\w]+) = /.exec( _statements[ _i - 1 ] );
			if ( _match ) {
				_variable = _match[ 1 ];
				_returned = eval( _variable );
				_statements[ _i ] = toString( _returned ) + '\n\n';
			}
		} else {
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
