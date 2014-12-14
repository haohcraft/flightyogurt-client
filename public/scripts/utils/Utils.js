/**
 * Util methods
 */

var Utils = {

	/*==========  Variables  ==========*/
	
	monthNames: [ "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"],

   	// URL_BASE : "http://fy.haohcraft.com/?",
   	URL_BASE : "http://localhost:4003/?",

    /*==========  Methods  ==========*/

    getApiBaseUrl: function() {
    	return Utils.URL_BASE;
    },

    getURLComponentByObj: function(obj) {
    	
    	var str = "";
    	if (obj) {
	    	str = Object.keys(obj).map(function(key){ 
			  return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]); 
			}).join('&');
    	}

		return str;
    },

    /**
     * Parse Moment object to 'MMM DD' format 
     * @param  {[type]} date A Moment date
     * @param  {[type]} format A moment format, like "MMM DD"
     * @return {[type]}       [description]
     */
    parseMomentDate: function(date, format) {
    	return date.format(format);
    },
    
	/**
	 * Detect whether or not the object is empty
	 * @param  {[type]}  obj [description]
	 * @return {Boolean}     [description]
	 */
	isObjectEmpty: function (obj) {
	    for(var prop in obj) {
	        if(obj.hasOwnProperty(prop))
	            return false;
	    }
	    return true;
	},
	/**
	 * Get the full name of the month
	 * @param  {[type]} date The Date instance
	 * @return {[type]}      The full month name, e.g.. October
	 */
	getMonthName: function(date) {
		return this.monthNames[date.getMonth()];
	},
	
	/**
	 * Get the short month name
	 * @param  {[type]} date [description]
	 * @return {[type]}      The short month name, e.g.. Oct
	 */
	getShortMonthName: function(date) {
		return this.getMonthName().substr(0, 3);
	},

	generateUniqueKey: function(name) {

		var unique = "fy_";
		if (name) {
			unique += name;
		}
		return unique + Date.now() + Math.random();
	}

};

module.exports = Utils;