/**
 * The dedicated dispatcher for this app
 */

var AppConstants = require('scripts/constants/AppConstants');
var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');
var PayloadSources = AppConstants.PayloadSources;

var FlightYogurtDispatcher = copyProperties(new Dispatcher(), {

	/**
	* @param {object} action The details of the action, including the action's
	* type and additional data coming from the server.
	*/
	handleServerAction: function(action) {

		var payload = {
		  source: PayloadSources.SERVER_ACTION,
		  action: action
		};

		console.log("handleServerAction with payload", payload);
		this.dispatch(payload);
	},
	
	/**
	* @param {object} action The details of the action, including the action's
	* type and additional data coming from the view.
	*/
	handleViewAction: function(action) {
		var payload = {
		  source: PayloadSources.VIEW_ACTION,
		  action: action
		};
		console.log("handleViewAction with payload", payload);
		this.dispatch(payload);
	}

});

module.exports = FlightYogurtDispatcher;