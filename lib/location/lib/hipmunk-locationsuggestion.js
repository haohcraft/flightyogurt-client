/*====================================================
=            ITA Tool Location Suggestion            =
====================================================*/
"use strict";

var log = require('debug')('flightyogurt:HipmunkLocationSuggestion');
var config = require('./config.js');
var Needle = require('needle');
var Util = require('./util.js');

var HipmunkLocationSuggestion = function () {
	
	this.config = config.hipmunk;
};


/*==========  Methods  ==========*/
HipmunkLocationSuggestion.prototype.searchByQueryForLocationSuggestion = function (query, cal) {

	log("Search for citysAndAirports by ", query);

	var requestUrl = this.config.base_url 
		+ this.config.request_url_location_suggestion
		+ query;
	// console.log("The requ is ", requestUrl);

	Needle.get(requestUrl, function(err, resp) {
		// console.log(resp);
		if (!err) {
			var result = Util.parseJsonForLocationSuggestionFromHipmunk(resp.body);
			cal(result);
		} else {
			log("Failed to get the HipmunkLocationSuggestion ...");
			cal(null);
		}
	});

}




module.exports = HipmunkLocationSuggestion;


/*-----  End of ITA Tool Location Suggestion  ------*/

