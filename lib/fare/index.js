/**
 * Parsing Goolge Flight for the lowest flight fare
 */
"use strict";

var log = require('debug')('flightyogurt:fareAPI');

var Util = require('./lib/util.js');
var ItaFare = require('./lib/ita-fare.js');


var Fare = function (origin, destination, date_departure, date_return) {
	log("Init Fare ...");
	this.fareApi = new ItaFare(origin, destination, date_departure, date_return);
}


/**
 * [getLowestFareRT description]
 * https://www.google.com/flights/#search;f=JFK,EWR,LGA;t=SFO;d=2014-08-29;r=2014-09-02
 * @param  {[type]} options {'from':'JFK', 'to':'SFO'}
 * @return {[type]}         [description]
 */
Fare.prototype.getLowestFare = function(callback) {
	log("getLowestFare ...");
	this.fareApi.crawlFare(callback);
}

Fare.prototype.getUrl = function (options) {
	return Util.generateUrl(options);
}

Fare.prototype.getGoogleFlightUrl = function (options) {
	return Util.generateGoogleFlightUrl(options);
}

Fare.prototype.getDohopFlightUrl = function (options) {
	return Util.generateDohopFlightUrl(options);
}

Fare.prototype._printResult = function(result) {
	log("_printResult: ", result);
}

module.exports = Fare;