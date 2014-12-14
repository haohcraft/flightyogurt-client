/**
 * Action creator to faciliate the search
 */

var Dispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var SearchActionTypes = AppConstants.SearchActionTypes;

var SearchAction = {

	clickRTButton: function(data) {
		Dispatcher.handleViewAction({
			type: SearchActionTypes.CLICK_ONEWAY,
			data: data
		});
	},

	focusInput: function(data) {
		Dispatcher.handleViewAction({
			type: SearchActionTypes.FOCUS_INPUT,
			data: data
		});
	},


	/**
	 * Add a new search view
	 */
	addSearch: function() {
		Dispatcher.handleViewAction({
			type: SearchActionTypes.ADD_SEARCH
		});
	},

	/**
	 * Initialize the search post
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	createSearch: function (data) {
		Dispatcher.handleViewAction({
			type: SearchActionTypes.CLICK_SEARCH,
			data: data
		});
	}
};

module.exports = SearchAction;