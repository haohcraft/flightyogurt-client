/*================================================
=            A Flux store for Blog            =
================================================*/
var AppEventEmitter = require('scripts/utils/AppEventEmitter');
var AppDispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var merge = require('react/lib/merge');

var BlogActionTypes = AppConstants.BlogActionTypes;

var _data = {};

// NOTE: all the public APIs are getters
var BlogStore = merge(AppEventEmitter, {

	// Public Getter
	getBlogData: function() {
		return {
			blog: _data
		};
	}

});

BlogStore.dispatchToekn = AppDispatcher.register(function(payload) {
	var action = payload.action;
	var data = action.data;

	switch(action.type) {

		case BlogActionTypes.BLOG_GET:
			_data = data;
			BlogStore.emitChange();
			break;

		default:
			//Do nothing
	}
});

module.exports = BlogStore;
/*-----  End of A Flux store for Blog  ------*/
