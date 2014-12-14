/*================================================
=            Flux Action for Confirm            =
================================================*/
var Dispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var ConfirmActionTypes = AppConstants.ConfirmActionTypes;

var ConfirmAction = {

	clickBack: function() {
		Dispatcher.handleViewAction({
			type: ConfirmActionTypes.CLICK_BACK
		});
	},

	clickConfirm: function() {
		Dispatcher.handleViewAction({
			type: ConfirmActionTypes.CLICK_CONFIRM
		});
	},

	reset: function() {
		Dispatcher.handleViewAction({
			type: ConfirmActionTypes.RESET
		});
	}
};

module.exports = ConfirmAction;

/*-----  End of Flux Action for Confirm  ------*/

