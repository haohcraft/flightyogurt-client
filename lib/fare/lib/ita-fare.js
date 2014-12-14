/**
 * ITA fares
 */

"use strict";

var log = require('debug')('flightyogurt:fareAPI:ITAFare');
var config = require('./config.js');
var Util = require('./util.js');
var Needle = require("needle");

/*==========  Constructor  ==========*/
var ItaMatrixFare = function (origin, destination, date_departure, date_return) {

	this.config = config.ita_matrix;
	this.json_request = this.config.json_request;
	this._overrideJsonRequest(origin, destination, date_departure, date_return);

}

/*==========  Methods  ==========*/
/**
 * Crawling the fares based on the options
 * @param  {[type]}   options  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
ItaMatrixFare.prototype.crawlFare = function (callback) {
	
	log("Crawling Fare ...");
	var data = this.config.base_request + JSON.stringify(this.json_request);
	log("Crawling Fare with data ...", data);
	var request_url = this.config.base_url + this.config.request_url + data;
	log("Crawling Fare with request_url ...", request_url);
	var options = {
		headers : this.config.http_header,
		follow: true,
	};
	log("Making request to ITA Matrix data: ", data);
	log("Making request to ITA Matrix request_url: ", request_url);

	Needle.post(request_url, null, options, function(err, resp) {

		if (!err) {
			log("Getting response from ITA Matrix data: ", resp.body.length);
			var result = Util.paraseJsonFareForLowestPrice(resp.body.substring(4));
			callback(result);	
		} else {
			log("Failed to get the fare ...");
			callback(null);
		}
		
	});

}

ItaMatrixFare.prototype._overrideJsonRequest = function (origin, destination, date_departure, date_return) {

	this._overrideJsonRequestWithOrigin(origin);
	this._overrideJsonRequestWithDest(destination);
	this._overrideJsonRequestWithDepartureDate(date_departure);
	this._overrideJsonRequestWithReturnDate(date_return);

}

ItaMatrixFare.prototype._overrideJsonRequestWithDepartureDate = function (date_departure) {
	this.json_request.slices[0].date = date_departure;
	log("_overrideJsonRequestWithDepartureDate ", this.json_request['slices'][0]['date']);
}

ItaMatrixFare.prototype._overrideJsonRequestWithReturnDate = function (date_return) {
	this.json_request.slices[1].date= date_return;
}


ItaMatrixFare.prototype._overrideJsonRequestWithOrigin = function (origin) {
	this.json_request.slices[0].origins[0] = origin;
	this.json_request.slices[1].destinations[0] = origin
}

ItaMatrixFare.prototype._overrideJsonRequestWithDest = function (destination) {
	this.json_request.slices[0].destinations[0] = destination;
    this.json_request.slices[1].origins[0] = destination;
}

// ItaMatrixFare.prototype._overrideJsonRequestWithAirlines = function (airlines) {
// 	if (airlines) {
// 		this.json_request['slices'][0]['routeLanguage'] = airlines;
//         this.json_request['slices'][1]['routeLanguage'] = airlines;
// 	}
// }

// ItaMatrixFare.prototype._overrideJsonRequestWithStops = function (stops) {
// 	if (!stops) {
// 		stops = 2;
// 	}
// 	this.json_request['maxStopCount'] = stops;
// }




module.exports = ItaMatrixFare;

