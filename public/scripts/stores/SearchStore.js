/**
 * The flux store for Search
 */
var AppEventEmitter = require('scripts/utils/AppEventEmitter');
var AppDispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var Utils = require('scripts/utils/Utils');
var merge = require('react/lib/merge');

var SearchActionTypes = AppConstants.SearchActionTypes;

var _searchParams = {};

// NOTE: the all public APIs are getters
var SearchStore = merge(AppEventEmitter, {


	getSearchParams: function() {
		return _searchParams;
	}
	
});

SearchStore.dispatchToken = AppDispatcher.register(function(payload) {

	var action = payload.action;
	var data = action.data;

	switch(action.type) {

		case SearchActionTypes.CLICK_SEARCH:

			_searchParams = data;
			// console.log("SearchActionTypes.CLICK_SEARCH: ", _searchParams);
			SearchStore.emitChange();
			break;


		default:
			//Do nothing
	}
});


module.exports = SearchStore;