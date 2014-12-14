/*=============================================
=            Flux action for Input            =
=============================================*/
var Dispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var InputActionTypes = AppConstants.InputActionTypes;


var InputAction = {

	clickClose: function() {
		Dispatcher.handleViewAction({
			type: InputActionTypes.CLICK_CLOSE
		});
	},

	/**
	 * Save the input
	 * @param  {[type]} data {type: SearchDataTypes.FROM, value: 'BOS'}
	 * @return {[type]}      [description]
	 */
	saveInput: function(data) {
		Dispatcher.handleViewAction({
			type: InputActionTypes.SAVE_INPUT,
			data: data
		});
	},
};

module.exports = InputAction;

/*-----  End of Flux action for Input  ------*/

