/*=============================================
=            Flux action for Cookie            =
=============================================*/
var Dispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var CookieActionTypes = AppConstants.CookieActionTypes;


var CookieAction = {

	/**
	 * Update cookie
	 * @param  {[type]} data
	 * @return {[type]}
	 */
	updateCookie: function(data) {
		Dispatcher.handleViewAction({
			type: CookieActionTypes.UPDATE,
			data: data
		});
	},
};

module.exports = CookieAction;

/*-----  End of Flux action for Cookie  ------*/
