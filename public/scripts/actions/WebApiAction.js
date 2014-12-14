/*================================================
=            A Flux action for WebAPI            =
================================================*/
var Dispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var WebActionTypes = AppConstants.WebActionTypes;
var WebApiAction = {

	get: function (url, data, options) {
		$.ajax({
			type: 'GET',
			url: url,
			data: data,
			dataType: 'json',
			success: function(response) {
				
				Dispatcher.handleServerAction({
					type: options.actionType !== null ? options.actionType : WebActionTypes.GET ,
					data: response,
					options: options
				});
			},
			error: function(xhr, type) {
				Dispatcher.handleServerAction({
					type: WebActionTypes.ERROR,
					data: {'xhr': xhr, 'type': type}
				});
			}
		});
	},

	post: function (url, data, options) {
		$.ajax({
			type: 'POST',
			url: url,
			data: data,
			dataType: 'json',
			success: function(response) {
				// console.log("WebApiAction post success", data);
				Dispatcher.handleServerAction({
					type: options.actionType !== null ? options.actionType : WebActionTypes.POST,
					data: response,
					options: options
				});
			},
			error: function(xhr, type) {
				Dispatcher.handleServerAction({
					type: WebActionTypes.ERROR,
					data: {'xhr': xhr, 'type': type}
				});
			}
		});
	}
};

module.exports = WebApiAction;
/*-----  End of A Flux action for WebAPI  ------*/

