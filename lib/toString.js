'use strict';

// MODULES //

var cast = require( 'compute-cast-arrays' ),
	isArray = require( 'validate.io-array' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	isPrimitive = require( 'validate.io-primitive' );


// TO STRING //

/**
* FUNCTION toString( x )
*	Turns a JavaScript object into a string suitable for the README.md comments.
*
* @param {*} x - input value
* @returns {String} string representation of the input value
*/
function toString( x ) {
	var str;
	if ( isPrimitive( x ) ) {
		return '// returns ' + x;
	}
	if ( isArray( x ) ) {
		return '// returns [ ' + x.join( ', ' ) + ' ]';
	}
	if ( isMatrixLike( x ) ) {
		str = '';
		str += '/*\n';
		str += '\t[ ';
		str += x.toString().replace( /;/g,'\n\t  ' ).replace( /,/g,' ');
		str += ' ]\n';
		str += '*/';
		return str;
	}
	if ( isTypedArrayLike( x ) ) {
		return '// returns ' + x.constructor.name + '( [' + cast( x, 'generic' ).join( ',' ) + '] )';
	}
} // end FUNCTION toString()


// EXPORTS //

module.exports = toString;
