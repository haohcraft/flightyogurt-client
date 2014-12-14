/**
 * @jsx React.DOM
 */

var React = require('react');

/*==========  Flux store  ==========*/
var CalendarStore = require('scripts/stores/CalendarStore');
/*==========  Flux action  ==========*/
var CalendarAction = require('scripts/actions/CalendarAction');
/*==========  Static  ==========*/
var GUIDE_TITLES = {
	0 : "Pick a Date to Take off",
	1 : "Grab a Return Date",
	2 : "Here We Go"
};

var CalenderGuide = React.createClass({

	getInitialState: function() {
		return {
			titleIndex: 0 
		};
	},

	componentDidMount: function() {
		CalendarStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		CalendarStore.removeChangeListener(this._onChange);	
	},

	render: function() {
		return (
			<div className="fy-calendar-guide">
				<div className="fy-calendar-guide-title">{GUIDE_TITLES[this.state.titleIndex]}</div>
				<div className="fy-calendar-guide-action" onClick={this._onClick}>Done</div>
			</div>
		);
	},
	/*==========  Private Method  ==========*/
	_getStateFromStores: function() {
		return CalendarStore.getSelectedDates();
	},
	

	/*==========  Event Handler  ==========*/
	_onChange: function(e) {
		
		var _isRT = CalendarStore.getIsReturn();
		var _selected = this._getStateFromStores();
		var _titleIndex = 0;
		
		_titleIndex = _selected.length;
		if (!_isRT && _selected.length === 1) {
			_titleIndex = 2;
		}

		this.setState({
			titleIndex: _titleIndex 
		});

	},

	_onClick: function(e) {
		CalendarAction.clickDone();
	}
	

});


module.exports = CalenderGuide;