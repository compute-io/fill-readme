'use strict';

/**
* FUNCTION validate( code, loadCommand )
*	Validates whether a code block correctly executes.
*
* @param {String} code - code block
* @param {String} loadCommand - code to load package(s)
* @returns {Error|Null} returns null if code executes without errors, otherwise returns Error
*/
function validate( code, loadCommand ) {
	// Disable JSHINT warning about `eval` usage:
	/*jshint -W061 */
	code = loadCommand.concat( code );
	try {
		eval( code );
	}
	catch( err ) {
		return err;
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
