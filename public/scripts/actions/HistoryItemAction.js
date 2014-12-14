/*=============================================
=            Flux action for HistoryItem            =
=============================================*/
var Dispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var HistoryItemActionTypes = AppConstants.HistoryItemActionTypes;


var HistoryItemAction = {

	/**
	 * Action
	 * @param  {[type]} data
	 * @return {[type]}
	 */
	clickNext: function(data) {
		Dispatcher.handleViewAction({
			type: HistoryItemActionTypes.CLICK_NEXT,
			data: data
		});
	},

	clickPre: function(data) {
		Dispatcher.handleViewAction({
			type: HistoryItemActionTypes.CLICK_PRE,
			data: data
		});
	},

	clickMore: function() {
		Dispatcher.handleViewAction({
			type: HistoryItemActionTypes.CLICK_MORE
		});
	},

	clickDismiss : function() {
		Dispatcher.handleViewAction({
			type: HistoryItemActionTypes.CLICK_DISMISS
		});
	}

};

module.exports = HistoryItemAction;

/*-----  End of Flux action for HistoryItem  ------*/

