'use strict';

/**
* FUNCTION repeat( str, count )
*	Repeats an input string a certain number of times.
*	Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
*
* @param {String} str - string to repeat
* @param {Number} count - number of times the string is repeated
* @returns {String} concatenated string repeating the input string `count` times
*/
function repeat( str, count ) {
	var rpt = '';
	for (;;) {
		if ( ( count & 1 ) === 1) {
			rpt += str;
		}
		count >>>= 1;
		if (count === 0) {
			break;
		}
		str += str;
	}
	return rpt;
} // end FUNCTION repeat()


// EXPORTS //

module.exports = repeat;
