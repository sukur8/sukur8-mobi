// Extend the "Function" object prototype to implement binding
Function.prototype.bind = function(pContext) {
	var m = this;
	return function() {
		return m.apply(pContext, arguments);
	}
}

// Main package
var html5 = {};

// Test package
html5.tests = {};

//Utils package
html5.utils = {};

//Date utils
html5.utils.date = {
	// Format a number
	// @param {Number} pNumber Number to format
	// @param {Number} pSize Length of the returned formatted string (default: 2)
	// @type String
	// @return {String} The formatted number, prefixed with some '0' if necessary
	 formatNumber: function(pNumber, pSize) {
		var formattedNumber = pNumber.toString();
		var size = (pSize == null) || (pSize < 1) ? 2 : pSize;
		var n = size - formattedNumber.length;
		for (var i = 0; i < n; i++)
			formattedNumber = "0" + formattedNumber;
		return formattedNumber;
	},

	// Format a date using the given pattern
	// @param {Date} pDate Date to format
	// @param {String} pPattern The pattern describing the date and time format
	// @param {Boolean} pUTC True to format UTC date, false else (default)
	// @type String
	// @return {String} The formatted date-time string
	formatDate: function(pDate, pPattern, pUTC) {
		var utc = (pUTC == null) ? false : pUTC;
		var str = pPattern;
		// Retrieve date components
		var dd = utc ? pDate.getUTCDate() : pDate.getDate();
		var MM = utc ? pDate.getUTCMonth() : pDate.getMonth();
		var yyyy = utc ? pDate.getUTCFullYear() : pDate.getFullYear();
		var HH = utc ? pDate.getUTCHours() : pDate.getHours();
		var mm = utc ? pDate.getUTCMinutes() : pDate.getMinutes();
		var ss = utc ? pDate.getUTCSeconds() : pDate.getSeconds();
		var SSS = utc ? pDate.getUTCMilliseconds() : pDate.getMilliseconds();
		// Replace pattern parts
		str = str.replace('dd', this.formatNumber(dd));
		str = str.replace('MM', this.formatNumber(MM + 1));
		str = str.replace('yyyy', yyyy);
		str = str.replace('HH', this.formatNumber(HH));
		str = str.replace('mm', this.formatNumber(mm));
		str = str.replace('ss', this.formatNumber(ss));
		str = str.replace('SSS', this.formatNumber(SSS, 3));
		// Return formatted string
		return str;
	},

	// Format a JS date as FR format (dd/MM/yyyy HH:mm:ss.SSS UTC)
	// @param {Date} pDate Date to format
	// @type String
	// @return {String} Formatted date
	formatDateAsFr_yMdHmsS_UTC: function(pDate) {
		return this.formatDate(pDate, 'dd/MM/yyyy HH:mm:ss.SSS', true);
	}
};