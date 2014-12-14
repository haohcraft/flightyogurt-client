/*================================================
=            A Flux store for HistoryItem            =
================================================*/
var AppEventEmitter = require('scripts/utils/AppEventEmitter');
var AppDispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var merge = require('react/lib/merge');

var WebActionTypes = AppConstants.WebActionTypes;
var HistoryItemActionTypes = AppConstants.HistoryItemActionTypes;
/*==========  Constants  ==========*/
var ComponentKeyConstants = require('scripts/constants/ComponentKeyConstants');
var KEY = ComponentKeyConstants.KEY_HISTORY_ITEM;

var _data = {};
var _threadKey;

// NOTE: all the public APIs are getters
var HistoryItemStore = merge(AppEventEmitter, {

	// Public Getter
	getDataFromStore : function() {
		return {
			data: _data,
			threadKey : _threadKey
		};
	}

});

HistoryItemStore.dispatchToekn = AppDispatcher.register(function(payload) {
	var action = payload.action;
	var data = action.data;

	switch(action.type) {

		case WebActionTypes.POST:
			var _options = action.options;
			if (KEY === _options.componentKey) {
				_data = data;
				_threadKey = _options.threadKey;
				HistoryItemStore.emitChange();
			}

			break;
		default:
			//Do nothing
	}
});

module.exports = HistoryItemStore;
/*-----  End of A Flux store for HistoryItem  ------*/
