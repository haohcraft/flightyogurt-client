/*====================================================
=            ITA Tool Location Suggestion            =
====================================================*/
"use strict";

var log = require('debug')('flightyogurt:ItaLocationSuggestion');
var config = require('./config.js');
var Needle = require('needle');
var Util = require('./util.js');

var ItaLocationSuggestion = function () {
	
	this.config = config.ita_matrix;
};


/*==========  Methods  ==========*/
ItaLocationSuggestion.prototype.searchByQueryForLocationSuggestion = function (query, cal) {

	log("Search for citysAndAirports by ", query);

	var requestUrl = this.config.base_url 
		+ this.config.request_url_location_suggestion
		+ query;
	log("The requ is ", requestUrl);

	Needle.get(requestUrl, function(err, resp) {

		if (!err) {
			// log("Gettting response from ITA for location suggestion", resp.body);
			var result = Util.parseJsonForLocationSuggestion(resp.body);
			cal(result);
		} else {
			log("Failed to get the ItaLocationSuggestion ...");
			cal(null);
		}
	});

}




module.exports = ItaLocationSuggestion;


/*-----  End of ITA Tool Location Suggestion  ------*/

