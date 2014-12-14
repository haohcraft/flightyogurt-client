/*================================================
=            A Flux store for Confirm            =
================================================*/
var AppEventEmitter = require('scripts/utils/AppEventEmitter');
var AppDispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var merge = require('react/lib/merge');

var ConfirmActionTypes = AppConstants.ConfirmActionTypes;

var _isClickBack = false;

// NOTE: all the public APIs are getters
var ConfirmStore = merge(AppEventEmitter, {

	// Public Getter
	getBackClickStatus: function() {
		return _isClickBack;
	}


});

ConfirmStore.dispatchToekn = AppDispatcher.register(function(payload) {
	var action = payload.action;
	var data = action.data;
	switch(action.type) {

		case ConfirmActionTypes.CLICK_BACK:
			// console.log("CLICK_BACK ...");
			_isClickBack = !_isClickBack;
			ConfirmStore.emitChange();
			break;
		case ConfirmActionTypes.RESET:
			_isClickBack = false;
		default:
			//Do nothing
	}
});

module.exports = ConfirmStore;
/*-----  End of A Flux store for Confirm  ------*/
