/**
 * Component Key Constants
 * Those keys imply that where the action comes from
 */


var Utils = require('scripts/utils/Utils');
 
module.exports = {
	KEY_DASHBOARD: Utils.generateUniqueKey("KEY_DASHBOARD"),
	KEY_HISTORY_ITEM: Utils.generateUniqueKey("KEY_HISTORY_ITEM"),
	KEY_SEARCH_RESULT: Utils.generateUniqueKey("KEY_SEARCH_RESULT"),

};