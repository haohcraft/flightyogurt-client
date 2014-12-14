/*================================================
=            a Flux store for Input            =
================================================*/
var AppEventEmitter = require('scripts/utils/AppEventEmitter');
var AppDispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var DataConstants = require('scripts/constants/DataConstants');
var moment = require('moment');
var merge = require('react/lib/merge');
var Utils = require('scripts/utils/Utils');

var SearchActionTypes = AppConstants.SearchActionTypes;
var InputActionTypes = AppConstants.InputActionTypes;
var LocationSuggestionActionTypes = AppConstants.LocationSuggestionActionTypes;
var CalendarActionTypes = AppConstants.CalendarActionTypes;
/*==========  Flux Store  ==========*/
var CalendarStore = require('scripts/stores/CalendarStore');

var SearchDataTypes = DataConstants.SearchDataTypes;
/*==========  Private  ==========*/
var _isHiddenInput = true;
var _searchInputType = "";
var _searchId = {};
var _searchData = {};
var _initialCalendar = CalendarStore.getSelectedDatesWithReadableFormat();

/*==========  CONST  ==========*/
var DEFAULT_FROM = "NYC";
var DEFAULT_TO = "SFO";


/*==========  Static data ==========*/
var DEFAULT_SEARCH_DATA = {
	FROM : DEFAULT_FROM,
	TO : DEFAULT_TO,
	CALENDAR : _initialCalendar,
	RT: 1
};


// NOTE: the all public APIs are getters
var InputStore = merge(AppEventEmitter, {
	/**
	 * Get the current state of isHiddenInput
	 * @return {[type]} [description]
	 */
	getIsHiddenInput: function() {
		return _isHiddenInput;
	},
	/**
	 * Get the search input type, like `from`, `to` and `calendar`
	 * @return {[type]} [description]
	 */
	getSearchInputType: function() {
		return _searchInputType;
	},

	/**
	 * Wrap the search data
	 * @return {[type]}      [description]
	 */
	getCreatedSearchData: function() {
		
		var createdData = {};
		if(!Utils.isObjectEmpty(_searchId)) {
			createdData = {
				id: _searchId,
				date: new Date(Date.now()),
				searchData: _searchData[_searchId]
			};
		} else {
			// Default data
			createdData = {
				id: 001,
				date: new Date(Date.now()),
				searchData: DEFAULT_SEARCH_DATA
			}
		}

		return createdData;
	}

	
});

InputStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	var data = action.data;
	switch(action.type) {

		case SearchActionTypes.ADD_SEARCH:
			var timestamp = Date.now();
			var _defaultSearchData = {};
			_searchId = "search_id_" + timestamp;
			_searchData[_searchId] = DEFAULT_SEARCH_DATA;
			InputStore.emitChange();
			break;

		case SearchActionTypes.FOCUS_INPUT:
			_isHiddenInput = !_isHiddenInput;
			_searchInputType = data.type;
			// console.log('InputStore SearchActionTypes FOCUS_INPUT');
			InputStore.emitChange();
			break;

		case CalendarActionTypes.SELECT_DONE:
			_isHiddenInput = !_isHiddenInput;
			InputStore.emitChange();
			break;

		case InputActionTypes.CLICK_CLOSE:
			_isHiddenInput = !_isHiddenInput;
			InputStore.emitChange();
			break;

		case SearchActionTypes.CLICK_ONEWAY:
			if(!Utils.isObjectEmpty(_searchId)) {
				_searchData[_searchId][data.type] = data.value;
				InputStore.emitChange();
			}
			break;			

		case InputActionTypes.SAVE_INPUT:
			//Before save the data, waitFor 
			if(!Utils.isObjectEmpty(_searchId)) {
				_searchData[_searchId][data.type] = data.value;
				InputStore.emitChange();
			}
			break;

		case LocationSuggestionActionTypes.SELECT_ITEM:

			if(!Utils.isObjectEmpty(_searchId)) {
				_searchData[_searchId][data.type] = data.value;
				_isHiddenInput = !_isHiddenInput;
				InputStore.emitChange();
			}
			break;

		default:
			// Do nothing
	}
});


module.exports = InputStore;

/*-----  End of a Flux store for Input  ------*/

