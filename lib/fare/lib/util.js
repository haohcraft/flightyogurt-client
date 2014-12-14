/**
 * Utility 
 */

"use strict";

var log = require('debug')('flightyogurt:fareAPI:Utility');
var Config = require('./config.js');
var DEFAULT_MIN_PRICE = 'USD100000000';

/*==========  Private Methods  ==========*/
var generateUrlWithConfig = function(config, options) {
	var query = '';
	var url = '';

	for(var key in options) {
		if (!options.hasOwnProperty(key)) {
	      continue;
	    }
		query += config[key] + "=" + options[key];
	}

	url = config.base_url + query;

	return url;
} 

/*==========  Public Methods  ==========*/

exports.generateDashboardUrl = function(username) {
	var yogurtDash = Config.production;
	return generateUrlWithConfig(yogurtDash, {
		username: username
	});
}

exports.generateHipmunkFlightUrl = function (options) {
	var query = '';
	var hipmunkFlight = Config.hipmunk_flight;

	return generateUrlWithConfig(hipmunkFlight, options);
}


exports.generateDohopFlightUrl = function (options) {
	
	var query = '';
	var dohopFlight = Config.dohop_flight;

	return generateUrlWithConfig(dohopFlight, options);
}


/**
 * Get Google Flight style URL
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
exports.generateGoogleFlightUrl = function (options) {
	var query = '';
	var googleFlight = Config.google_flight;

	return generateUrlWithConfig(googleFlight, options);

}

exports.generateUrl = function (options) {

	var query = '';

	for(var key in options) {
		if (!options.hasOwnProperty(key)) {
	      continue;
	    }
		query += key + "=" + options[key] + "&";
	}

	log("_generateUrl query: ", query);

	return query;
};



/**
 * Parse the JSON fare data for the lowest price
 * @param  {[type]} jsonFareString [description]
 * @return {[type]}                [description]
 */
exports.paraseJsonFareForLowestPrice = function (jsonFareString) {
	// console.log("Parsing the json fare ...");
	// console.log("jsonFareString: ", jsonFareString);
	var result = {};
	var jsonFare  = null;
	 try {
		jsonFare = JSON.parse(jsonFareString);
	} catch (e) {
		// console.log("failed to parse jsonFareString", jsonFareString);
	}
	if (jsonFare && jsonFare.result) {
	
		var solutionList = jsonFare.result.solutionList;
		// console.log("JSON min Fare: ", jsonFare.result.solutionList.solutions);

		//TODO: parse each solution
		// var solutions = jsonFare.result.solutionList.solutions;
		// for (var key in solutions) {
		// 	var sol = solutions.get(key);
		// 	log("solutions: ", sol.toString());
		// 	break;
		// }
		// 
		// Get the global min price
		var minPrice = solutionList.minPrice


		result.minPrice = minPrice;

	} else {
		result.minPrice = DEFAULT_MIN_PRICE;
	}


	return result;
}