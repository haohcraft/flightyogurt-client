/*=============================================================
=            Utils for the location suggestion API            =
=============================================================*/
"use strict";

var log = require('debug')('flightyogurt:locationSuggestionAPI:Utility');
var Config = require('./config.js');

/**
 * Parse the JSON location suggestion data 
 * @param  {[type]} JsonLocationSuggestionObj [description]
 * @return {[type]} {id: 123, description: "JFK - New York John F Kennedy International, NY (JFK)"}                             [description]
 */
exports.parseJsonForLocationSuggestion = function (JsonLocationSuggestionObj) {

	var result = [];
	for (var key in JsonLocationSuggestionObj) {
		var _jsonLocation = JsonLocationSuggestionObj[key];
		var _locationSuggestion_id = Math.abs(_jsonLocation.longitude + _jsonLocation.latitude);
		var _locationSuggestion = _jsonLocation.code + " - " + _jsonLocation.name;
		result.push({
			id: _locationSuggestion_id,
			code: _jsonLocation.code,
			description: _locationSuggestion
		});
	}
	return result;
};

/**
 * Parse the Json result from Hipmunk
 * The JSON object would be like:
 *
 * {
 *  "loc_str": "bos",
 *  "rows": [
 *   {
 *     "city_id": "4da330d72a0ceb6e950188e6",
 *     "lat": 42.363321,
 *     "lon": -71.025255,
 *     "normalized": "bos - boston logan international - boston, ma",
 *     "text": "BOS - Boston Logan International - Boston, MA"
 *     },
 *     {
 *      "city_id": "4da330d72a0ceb6e950188e6",
 *      "lat": 42.352311,
 *      "lon": -71.055304,
 *      "normalized": "bos - [amtrak] boston south station - boston, ma",
 *       "text": "BOS - [Amtrak] Boston South Station - Boston, MA"
 *      }
 *  ]
 * }
 * @param  {[type]} JsonLocationSuggestionObj [description]
 * @return {[type]}                           [description]
 */
exports.parseJsonForLocationSuggestionFromHipmunk = function (JsonLocationSuggestionObj) {

	var result = [];
	// console.log("JsonLocationSuggestionObj:", JsonLocationSuggestionObj);
	var resultRows = JsonLocationSuggestionObj.rows;
	for (var key in resultRows) {
		var _jsonLocation = resultRows[key];
		var _locationSuggestion_id = _jsonLocation.normalized + Math.abs(_jsonLocation.lon + _jsonLocation.lat);
		var _locationSuggestion_code = _jsonLocation.text.substring(0, 3);
		var _locationSuggestion = _jsonLocation.text;

		result.push({
			id: _locationSuggestion_id,
			code: _locationSuggestion_code,
			description: _locationSuggestion
		});
	}
	return result;
};

/*-----  End of Utils for the location suggestion API  ------*/

