/**
 * @jsx React.DOM
 */

// This is built on https://github.com/Hanse/react-calendar/blob/master/src/calendar.js

"use strict";

var React = require('react');
var moment = require('moment');
var ReactComponentWithPureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
/*==========  Utils  ==========*/
var Utils = require('scripts/utils/Utils.js');

/*==========  Store  ==========*/
var CalendarStore = require('scripts/stores/CalendarStore');

/*==========  Components  ==========*/
var CalendarDay = require('scripts/components/Calendar/Day.jsx');

/*==========  Private  ==========*/
var _selectedDatesUnix = [];
var _isInBetween = false;

var CalendarMonth = React.createClass({

	displayName: "CalendarMonth",

	propTypes: {
		/**
		 * `month` for a moment month
		 * @type {[type]}
		 */
		month: React.PropTypes.object,

		/**
		 * `weekOffset` for the number of offset day for the
		 * first day of the month
		 * @type {[type]}
		 */
		weekOffset: React.PropTypes.number,
	},

	mixins: [ReactComponentWithPureRenderMixin],

	getDefaultProps: function() {
		return {
			month: {},
			weekOffset: 0
		};
	},

	getInitialState: function() {
		return {
			selectedDates: [] 
		};
	},

	componentDidMount: function() {
		CalendarStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		CalendarStore.removeChangeListener(this._onChange);	
	},

	render: function() {

		_selectedDatesUnix = this.state.selectedDates.map(function(date) {
			
			if (date) {
				return date.unix();
			} else {
				return 0;
			}
		});
		

		return (
			<div className="fy-calendar-month">
				<div className="fy-calendar-month-header">{this.props.month.format("MMM YYYY")}</div>
				<div className="clear"></div>
				<div className="fy-calendar-month-content">
					{this._generateDays().map(this._renderDay)}
				</div>
			</div>
		);
	},


	/*==========  Private Methods  ==========*/

	_renderDay: function(day /* a moment day*/) {

		return <CalendarDay 
			key={day.day} 
			day={day} 
			isDeparture={day.isDeparture} 
			isReturn={day.isReturn}
			isInMonth={day.isInMonth}
			isInBetween={day.isInBetween}
			isClickable={day.isClickable}/>;
	},
	
	_generateDays: function() {
		var _days = [];
		var _month = this.props.month;
		var _firstDate = _month.startOf('month');
		// In some case, the order of weekdays is shifted.
		// For example, it would not be 'Sun', 'Mon', ..., 'Sat'.
		var _diff = _firstDate.weekday() - this.props.weekOffset;
		var i = 0;
		var _numberOfDaysInMonth = _firstDate.daysInMonth();
		var _today = moment();
		if (_diff < 0) _diff += 7; 

		// Fill in the days of the previous month
		while (i < _diff) {
			var _day = moment([_month.year(), _month.month(), i - _diff + 1]);
			_days.push({
				day: _day,
				isInMonth: false,
				isDeparture: false,
				isReturn: false,
				isInBetween: false,
				isClickable: false
			});
			i++;
		} 

		// Fill in the days of this month
		i = 1;
		while (i <= _numberOfDaysInMonth) {

			var _day = moment([_month.year(), _month.month(), i]);
			var _isDeparture = _selectedDatesUnix.indexOf(_day.unix()) === 0;
			var _isReturn = _selectedDatesUnix.indexOf(_day.unix()) === 1;
			if ((_isDeparture || _isReturn) && _selectedDatesUnix.length === 2 ) { /* Only when inbetween, should switch the flag*/
				_isInBetween = !_isInBetween;
			};
			
			_days.push({
				day: _day,
				isInMonth: true,
				isDeparture: _isDeparture,
				isReturn: _isReturn,
				isInBetween: _isInBetween && !_isDeparture,
				isClickable: _day.unix() - _today.unix() >= 0
			});
			i++;
		}
		return _days;
	},

	_getStateFromStores: function() {
		return CalendarStore.getSelectedDates();
	},

	_onChange: function() {
		this.setState({
			selectedDates: this._getStateFromStores()
		});
	}

});

module.exports = CalendarMonth;