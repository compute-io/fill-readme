'use strict';

/**
* FUNCTION includes( str, search )
*	Check whether input string includes the supplied search string.
*
* @param {String} str - input string
* @param {String} search - string to search for
* @returns {Boolean} true if the search string is found, false otherwise
*/
function includes( str, search ) {
	return str.indexOf( search ) >= 0;
} // end FUNCTION includes()


// EXPORTS //

module.exports = includes;
