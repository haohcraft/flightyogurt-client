/**
 * @jsx React.DOM
 */
var React = require('react');
var Utils = require('scripts/utils/Utils');
require("styles/flightresult.less");
/*==========  Flux stores  ==========*/
var CalendarStore = require('scripts/stores/CalendarStore');
var InputStore = require('scripts/stores/InputStore');
/*==========  Static  ==========*/
var URL_BASE = "http://fy.haohcraft.com?";
var FlightResult = React.createClass({
	displayName: 'FlightResult',
	/*==========  React Lifecycle  ==========*/

	render: function() {
		// console.log("FlightResult: ", this.props.dohopQuery);
		var dohopUrl = this._generateDohopUrl();
		// console.log("FlightResult after _generateDohopUrl: ", dohopUrl);
		return <div className="fy-flightresult-container" id="flightfare">
			<div className="fy-flightresult-title">Search Result</div>
			<div className="fy-flightresult-sponsor"></div>
			<iframe ref="iframe" src={dohopUrl} width="100%" height="700" frameBorder="0"></iframe>
		</div>;
	},
	/*==========  Private Methods  ==========*/
	_generateDohopUrl: function() {
		var _data = {
			'd1': this.props.dohopQuery.d1, // the departure date
			'd2': this.props.dohopQuery.d2, // the return date
			'a1': this.props.dohopQuery.a1, // the departure city/airport
			'a2': this.props.dohopQuery.a2, // the return city/airport
			'return': this.props.dohopQuery.isReturn // 1 for rt; 0 for oneway
		};
		return URL_BASE + Utils.getURLComponentByObj(_data);
	}
});
module.exports = FlightResult;