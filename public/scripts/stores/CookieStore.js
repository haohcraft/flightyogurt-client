/*================================================
=            A Flux store for Cookie            =
================================================*/
var AppEventEmitter = require('scripts/utils/AppEventEmitter');
var AppDispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var merge = require('react/lib/merge');

var CookieActionTypes = AppConstants.CookieActionTypes;

var _data = {};

// NOTE: all the public APIs are getters
var CookieStore = merge(AppEventEmitter, {

	// Public Getter
	readCookie : function() {
		return _data;
	}
});

CookieStore.dispatchToekn = AppDispatcher.register(function(payload) {
	var action = payload.action;
	var data = action.data;

	switch(action.type) {

		case CookieActionTypes.UPDATE:
			_data = merge(_data, data);
			break;

		default:
			//Do nothing
	}
});

module.exports = CookieStore;
/*-----  End of A Flux store for Cookie  ------*/
