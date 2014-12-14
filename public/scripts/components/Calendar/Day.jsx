/**
 * @jsx React.DOM
 */
"use strict";
var React = require('react');
var CX = require('react/lib/cx');
var moment = require('moment');
/*==========  Flux Action  ==========*/
var CalendarAction = require('scripts/actions/CalendarAction');

var CalendarDay = React.createClass({

	displayName: "CalendarDay",

	propTypes: {

		/**
		 * `day` for the date of the month
		 * {day: moment(), isInMonth: true}
		 */
		day: React.PropTypes.object,
		
		/**
		 * `isInMonth` for whether this day is within the from/to dates
		 * @type {Boolean}
		 */
		isInMonth: React.PropTypes.bool,

		/**
		 * `isDeparture` for whether this is a departure date
		 * @type {Boolean}
		 */
		isDeparture: React.PropTypes.bool,

		/**
		 * `isReturn` for whether this is a return date
		 * @type {Boolean}
		 */
		isReturn: React.PropTypes.bool,

		/**
		 * `isInBetween` for whether this is a date in between the departure date and the return one
		 * @type {Boolean}
		 */
		isInBetween: React.PropTypes.bool,

		/**
		 * `isClickable` for whether this <Day /> is clickable
		 * @type {Boolean}
		 */
		isClickable: React.PropTypes.bool
	},
	
	/*==========  React Lifecycle  ==========*/
	

	getDefaultProps: function() {
		return {
			day: {},
			isDeparture: false,
			isReturn: false,
			isInBetween: false,
			isInMonth: false,
			isClickable: false
		};
	},

	render: function() {

		var _day = this.props.day.day;
		var _isInMonth = this.props.day.isInMonth;
		var _isDeparture = this.props.isDeparture;
		var _isReturn = this.props.isReturn;
		var _isInBetween = this.props.isInBetween;
		var _isClickable = this.props.isClickable;

		var classes = CX({
			"fy-calendar-day": true,
			"fy-calendar-day-isnotinmonth": !_isInMonth,
			"fy-calendar-day-isdeparture": _isDeparture,
			"fy-calendar-day-isreturn": _isReturn,
			"fy-calendar-day-isinbetween": _isInBetween,
			"fy-calendar-day-isclickable": _isClickable
		});
		return (
			<div className={classes} >
				<div className="fy-calendar-day-content"
					data-day={_day.date()}
					data-month={_day.month()}
					data-year={_day.year()}
					onClick={this._onDaySelect} >
					{_isInMonth ? _day.date() : ""}
				</div>
			</div>
		);
	},

	/*==========  Private Methods  ==========*/
	
	/*==========  Event Handler  ==========*/
	_onDaySelect: function(e) {

		e.preventDefault();
		if (!this.props.isClickable) return ;

		var _target = e.target;
		var _selectedYear = _target.getAttribute('data-year');
		var _selectedMonth = _target.getAttribute('data-month'); /*Month 0 is Jan*/
		var _selectedDay = _target.getAttribute('data-day');
		var _data = {
			// YYYY-MM-DD
			date: moment([_selectedYear, _selectedMonth, _selectedDay])
		};
		CalendarAction.selectDay(_data);
	}

});

module.exports = CalendarDay;