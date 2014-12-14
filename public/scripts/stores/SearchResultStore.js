/*================================================
=            A Flux store for SearchResult            =
================================================*/
var AppEventEmitter = require('scripts/utils/AppEventEmitter');
var AppDispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var merge = require('react/lib/merge');

var ComponentKeyConstants = require('scripts/constants/ComponentKeyConstants');
var KEY = ComponentKeyConstants.KEY_SEARCH_RESULT;
var WebActionTypes = AppConstants.WebActionTypes;

var _data = {};

// NOTE: all the public APIs are getters
var SearchResultStore = merge(AppEventEmitter, {

	// Public Getter
	getDataFromStore: function() {
		return {
			data: _data
		};
	}
});

SearchResultStore.dispatchToekn = AppDispatcher.register(function(payload) {
	var action = payload.action;
	var data = action.data;

	switch(action.type) {

		case WebActionTypes.POST:
			var _options = action.options;
			if (KEY === _options.componentKey) {
				_data = data;
				SearchResultStore.emitChange();
			}
			break;

		default:
			//Do nothing
	}
});

module.exports = SearchResultStore;
/*-----  End of A Flux store for SearchResult  ------*/
