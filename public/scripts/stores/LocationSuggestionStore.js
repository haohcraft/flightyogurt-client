/*==========================================================
=            Flux store for location suggestion            =
==========================================================*/
"use strict";
var AppEventEmitter = require('scripts/utils/AppEventEmitter');
var AppDispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var merge = require('react/lib/merge');

var LocationSuggestionActionTypes = AppConstants.LocationSuggestionActionTypes;

/*==========  Private  ==========*/
var _shouldDisplay = false;
var _result = {};

/*==========  Public Method  ==========*/
var LocationSuggestionStore = merge(AppEventEmitter, {

	getLocationSuggestion: function() {
		return {
			shouldDisplay: _shouldDisplay,
			results: _result
		};
	}
});

LocationSuggestionStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	var data = action.data;

	switch(action.type) {
		case LocationSuggestionActionTypes.UPDATE_SUGGESTION: 
			_shouldDisplay = true;
			_result = data;
			LocationSuggestionStore.emitChange();
			break;
		case LocationSuggestionActionTypes.SELECT_ITEM:
			_shouldDisplay = false;
			_result = null;
			LocationSuggestionStore.emitChange();
			break;
		default:
			// Do nothing
	} 
});

module.exports = LocationSuggestionStore;
/*-----  End of Flux store for location suggestion  ------*/

