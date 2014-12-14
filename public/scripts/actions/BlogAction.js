/*=============================================
=            Flux action for Blog            =
=============================================*/
var Dispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var copyProperties = require('react/lib/copyProperties');
var WebApiAction = require('scripts/actions/WebApiAction');
var BlogActionTypes = AppConstants.BlogActionTypes;

var ULR_GET_BLOG_BY_NAME = "/api/blob"

var BlogAction = copyProperties(new WebApiAction() ,{

	/**
	 * Action
	 * @param  {[type]} data
	 * @return {[type]}
	 */
	getBlogByName: function(data) {
		this.get(ULR_GET_BLOG_BY_NAME, data, {
			actionType: BlogActionTypes.BLOG_GET
		});
	},
});

module.exports = BlogAction;

/*-----  End of Flux action for Blog  ------*/

