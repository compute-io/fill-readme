/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	fill = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-fill-readme', function tests() {

	it( 'should export a function', function test() {
		expect( fill ).to.be.a( 'function' );
	});

	it( 'should export a function for creating code comments for a README.md file synchronously', function test() {
		expect( fill.sync ).to.be.a( 'function' );
	});

});
