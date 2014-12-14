/*===============================================
=            Flux store for Calendar            =
===============================================*/
var AppEventEmitter = require('scripts/utils/AppEventEmitter');
var AppDispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var DataConstants = require('scripts/constants/DataConstants');
var merge = require('react/lib/merge');
var CalendarActionTypes = AppConstants.CalendarActionTypes;
var SearchActionTypes = AppConstants.SearchActionTypes;
var SearchDataTypes = DataConstants.SearchDataTypes;
var Utils = require('scripts/utils/Utils');
var moment = require('moment');

/*==========  Static  ==========*/
var DATE_FORMAT = "MMM DD";

/*==========  Private Properties ==========*/
var _isRT = true;
var _selectedDates = [];
var DEFAULT_SELECT_ONEWAY_DATES = [moment().add(1, 'M')];
var DEFAULT_SELECT_RT_DATES = [
	moment().add(1, 'M'),
	moment().add(1, 'M').add(7, 'd')
]; /* It contains momnet date; And there are max two items inside*/

var _defaultDates = DEFAULT_SELECT_RT_DATES.slice(0);


/*==========  Public API  ==========*/
var CalendarStore = merge(AppEventEmitter, {

	getIsReturn: function() {
		return _isRT;
	},

	getSelectedDatesWithReadableFormat: function() {
		return _parseDateToHumanReadable(_selectedDates);
	},

	/**
	 * Get the selected dates.
	 * The possible output should be:
	 * 1. A departure date
	 * 2. A return date
	 * @return {[type]} [description]
	 */
	getSelectedDates: function() {

		return _selectedDates.length === 0 ? _defaultDates : _selectedDates ;
	}
});

CalendarStore.dispatchToken = AppDispatcher.register(function(payload) {
	
	var action = payload.action;
	var data = action.data;
	switch(action.type) {

		case SearchActionTypes.FOCUS_INPUT:
			// Clean the calendar, when user clicks the calendar again
			if (data.type === SearchDataTypes.CALENDAR) {
				_selectedDates = [].slice(0);
			}

			break;

		case CalendarActionTypes.SELECT_DAY:
			_generateSelectedDates(data.date);
			CalendarStore.emitChange();
			break;

		case CalendarActionTypes.SELECT_DONE:
			CalendarStore.emitChange();
			break;

		case SearchActionTypes.CLICK_ONEWAY:
			//If one way
			if (data.value === 0) {
				_selectedDates = DEFAULT_SELECT_ONEWAY_DATES.slice(0);
			} else {
				_selectedDates = DEFAULT_SELECT_RT_DATES.slice(0);
			}
			_isRT = !_isRT;
			CalendarStore.emitChange();
			break;

		default:
			// Do nothing
	}
});

/*==========  Private Methods ==========*/

/**
 * Translate the Moment dates to a human readable format
 * @param  {[type]} dates [description]
 * @return {[type]}       [description]
 */
var _parseDateToHumanReadable = function(dates) {

	var _result = "";
	var _dates = dates.length === 0 ? _defaultDates : dates;
	if (_dates.length > 0) {
		var _datesFormatted = _dates.map(function(date) {
			return Utils.parseMomentDate(date, DATE_FORMAT);
		});

		_result = _datesFormatted.join(' - ');
	} 
	return _result;
};

/**
 * [_generateSelectedDates description]
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
var _generateSelectedDates = function(date) {

	var _selectedDatesUnix = _selectedDates.map(function(date) {
		return date ? date.unix(): 0;
	});
	var _minDatesUnix = _selectedDatesUnix[0];
	var _dateUnix = date.unix();

	if (_dateUnix === _minDatesUnix) { 
		// Clear the dates when click the existing date
		_selectedDates.pop();

	} else {
		if (!_isRT) { /*For the oneway*/

			_selectedDates = [date];

		} else {

			if (_selectedDates.length > 1) {

				_dateUnix < _minDatesUnix ? _selectedDates[0] = date : _selectedDates[1] = date;	
			} else {
				_selectedDates.push(date);
			}
			// Sort
			_selectedDates.sort(function(date1, date2) {
				return date1.unix() - date2.unix();
			});
		}
	}
};


module.exports = CalendarStore;
/*-----  End of Flux store for Calendar  ------*/

