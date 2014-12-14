/**
 * Holding constants
 */

var keyMirror = require('react/lib/keyMirror');

module.exports = {

	PayloadSources: keyMirror({
		SERVER_ACTION: null,
		VIEW_ACTION: null
	}),
	/*==========  Server Type Action  ==========*/
	WebActionTypes: keyMirror({
		GET: null,
		POST: null,
		ERROR: null,
		KEY: null
	}),

	/*==========  View Type Action  ==========*/
	BlogActionTypes: keyMirror({
		BLOG_GET: null
	}),

	HistoryItemActionTypes: keyMirror({
		CLICK_NEXT: null,
		CLICK_PRE: null,
		CLICK_MORE: null,
		CLICK_DISMISS: null
	}),

	CookieActionTypes: keyMirror({
		UPDATE: null,
		READ: null
	}),

	SearchActionTypes: keyMirror({
		CLICK_SEARCH: null,
		ADD_SEARCH: null,
		FOCUS_INPUT: null,
		CLICK_ONEWAY: null
	}),

	InputActionTypes: keyMirror({
		FOCUS_INPUT: null,
		CLICK_CLOSE: null,
		SAVE_INPUT: null
	}),

	LocationSuggestionActionTypes: keyMirror({
		SELECT_ITEM: null,
		UPDATE_SUGGESTION: null
	}),

	CalendarActionTypes: keyMirror({
		SELECT_DAY: null,
		SELECT_DONE: null
	}),

	ConfirmActionTypes: keyMirror({
		CLICK_BACK: null,
		CLICK_CONFIRM: null,
		RESET: null
	})

};