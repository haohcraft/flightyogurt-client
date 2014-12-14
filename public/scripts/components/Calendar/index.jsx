/**
 * @jsx React.DOM
 */

"use strict";

var React = require('react');
var moment = require('moment');

/*==========  Components  ==========*/
var CalendarMonth = require('scripts/components/Calendar/Month.jsx');
var CalendarGuide = require('scripts/components/Calendar/Guide.jsx');
/*==========  LESS  ==========*/
require('styles/calendar.less');


var Calendar = React.createClass({

	DisplayName: "Calendar",

	getInitialState: function() {
		return {
			numberOfMonths: 5 
		};
	},

	render: function() {

		return (
			<div className="fy-calendar">
				<CalendarGuide />
				<div className="fy-calendar-header">
					<div className="fy-calendar-header-day">SUN</div>
					<div className="fy-calendar-header-day">MON</div>
					<div className="fy-calendar-header-day">TUE</div>
					<div className="fy-calendar-header-day">WED</div>
					<div className="fy-calendar-header-day">THU</div>
					<div className="fy-calendar-header-day">FRI</div>
					<div className="fy-calendar-header-day">SAT</div>
				</div>
				<div className="fy-calendar-grid clearfix">
					<CalendarMonth key={1} month={moment()} weekOffset={0}/>
					<CalendarMonth key={2} month={moment().add(1, 'months')} weekOffset={0}/>
					<CalendarMonth key={3} month={moment().add(2, 'months')} weekOffset={0}/>
					<CalendarMonth key={4} month={moment().add(3, 'months')} weekOffset={0}/>
					<CalendarMonth key={5	} month={moment().add(4, 'months')} weekOffset={0}/>
				</div>
			</div>
		);
	}

});

module.exports = Calendar;