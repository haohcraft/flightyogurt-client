/*==========================================================
=            Config for Location Suggestion API            =
==========================================================*/
"use strict";

var Config = {

	'ita_matrix': {
		'base_url': 'http://matrix.itasoftware.com',
		'request_url_location_suggestion': "/geosearch/service/json/suggest/citiesAndAirports?",
	},
	'hipmunk': {
		'base_url': "https://www.hipmunk.com",
		'request_url_location_suggestion': '/autocomplete?d=autocomplete-container&'
	}
};

module.exports = Config;


/*-----  End of Config for Location Suggestion API  ------*/

