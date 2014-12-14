/*================================================
=            A Flux store for WebApi            =
================================================*/
var AppEventEmitter = require('scripts/utils/AppEventEmitter');
var AppDispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var merge = require('react/lib/merge');

var WebApiActionTypes = AppConstants.WebApiActionTypes;


// NOTE: all the public APIs are getters
var WebApiStore = merge(AppEventEmitter, {

	// Public Getter

});

WebApiStore.dispatchToekn = AppDispatcher.register(function(payload) {
	var action = payload.action;
	var data = action.data;

	switch(action.type) {

		case WebApiActionTypes.POST:
			WebApiStore.emitChange();
			break;
		case WebApiActionTypes.GET:
			WebApiStore.emitChange();
			break;
		default:
			//Do nothing
	}
});

module.exports = WebApiStore;
/*-----  End of A Flux store for WebApi  ------*/
