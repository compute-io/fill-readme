'use strict';

// MODULES //

var cast = require( 'compute-cast-arrays' ),
	roundn = require( 'compute-roundn'),
	isNumberArray = require( 'validate.io-number-primitive-array' ),
	isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isObjectArray = require( 'validate.io-object-array' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isPrimitive = require( 'validate.io-primitive' ),
	util = require( 'util' );


// FUNCTIONS //

var repeat = require( './repeat.js' );


// TO STRING //

/**
* FUNCTION toString( x, noTabs )
*	Turns a JavaScript object into a string suitable for the README.md comments.
*
* @param {*} x - input value
* @param {Number} noTabs - number of tabs used for indentation
* @returns {String} string representation of the input value
*/
function toString( x, noTabs ) {
	var str,
		tabs;

	tabs = repeat( '\t', noTabs );
	if ( isPrimitive( x ) ) {
		if ( isNumber( x ) ) {
			return tabs + '// returns ' + roundn( x, -3 );
		}
		return tabs + '// returns ' + x;
	}
	if ( isObjectArray( x ) ) {
		str = '';
		str += tabs + '/*\n';
		str += tabs + util.inspect( x, {
			'depth': 3
		}) + '\n';
		str += tabs + '*/';
		return str;
	}
	if ( isNumberArray( x ) ) {
		str = '';
		str += tabs + '// returns [ ';
		str += roundn( x, -3 ).join( ', ' );
		str += ' ]';
		return str;
	}
	if ( isArray( x ) ) {
		str = tabs + '// returns [ ' + x.join( ', ' ) + ' ]';
		return str;
	}
	if ( isMatrixLike( x ) ) {
		x = roundn( x, -3 );
		str = '';
		str += tabs + '/*\n';
		str += tabs + '\t[ ';
		str += tabs + x.toString().replace( /;/g,'\n\t  ' ).replace( /,/g,' ');
		str += tabs + ' ]\n';
		str += tabs + '*/';
		return str;
	}
	if ( isTypedArrayLike( x ) ) {
		str = '';
		str += tabs + '// returns ';
		str += x.constructor.name + '( [';
		str += roundn( cast( x, 'generic' ), -3 ).join( ',' );
		str += '] )';
		return str;
	}
	if ( isObject( x ) ) {
		return tabs + '// returns ' + util.inspect( x );
	}
} // end FUNCTION toString()


// EXPORTS //

module.exports = toString;
