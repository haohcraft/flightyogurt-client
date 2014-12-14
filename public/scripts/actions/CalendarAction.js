/*================================================
=            Flux Action for Calendar            =
================================================*/
var Dispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var CalendarActionTypes = AppConstants.CalendarActionTypes;

var CalendarAction = {

	selectDay: function (data) {
		Dispatcher.handleViewAction({
			type: CalendarActionTypes.SELECT_DAY,
			data: data
		});
	},

	clickDone: function() {
		Dispatcher.handleViewAction({
			type: CalendarActionTypes.SELECT_DONE
		});
	}
};

module.exports = CalendarAction;

/*-----  End of Flux Action for Calendar  ------*/

