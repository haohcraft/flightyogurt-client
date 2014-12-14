/*==============================================================
=            Flux Action for the LocationSuggestion            =
==============================================================*/
var Dispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var LocationSuggestionActionTypes = AppConstants.LocationSuggestionActionTypes;

var LocationSuggestionAction = {
	
	/**
	 * Select the list item
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	selectListItem: function(data) {
		Dispatcher.handleViewAction({
			type: LocationSuggestionActionTypes.SELECT_ITEM,
			data: data
		});
	},

	/**
	 * Update the suggestion results when get the AJAX results
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	updateSuggestion: function(data) {
		Dispatcher.handleViewAction({
			type: LocationSuggestionActionTypes.UPDATE_SUGGESTION,
			data: data
		});
	}
};

module.exports = LocationSuggestionAction;
/*-----  End of Flux Action for the LocationSuggestion  ------*/

