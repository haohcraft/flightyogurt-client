/**
 * @jsx React.DOM
 *
 */

var React = require('react');
var _ = require('underscore');
var Router = require('react-router');
var Link = Router.Link;
/*==========  LESS  ==========*/
require('styles/dashboard.less');

/*==========  React Components  ==========*/
var Utils = require('scripts/utils/Utils');
var HistoryItem = require('scripts/components/SearchHistoryItem.jsx');
var FlightResult = require('scripts/components/FlightResult.jsx');

/*==========  Variables  ==========*/
var URL_POST_HISTORY = '/api/getuserhistory';

/*==========  Flux action  ==========*/
var WebApiAction = require('scripts/actions/WebApiAction');
var CookieAction = require('scripts/actions/CookieAction');
var ConfirmAction = require('scripts/actions/ConfirmAction');

/*==========  Flux store  ==========*/
var DashboardStore = require('scripts/stores/DashboardStore');
var CookieStore = require('scripts/stores/CookieStore');

/*==========  Constants  ==========*/
var ComponentKeyConstants = require('scripts/constants/ComponentKeyConstants');

/*==========  Static  ==========*/
var KEY = ComponentKeyConstants.KEY_DASHBOARD;	
var DISPLAY_NAME = "dashboard";

var Dashboard = React.createClass({

	displayName: DISPLAY_NAME,

	username: "",

	getInitialState: function() {
		return {
			historyItems: [] ,
			currentItemIndex: 0,
			total: 0,
			isShowMore: false,
			isDismissConfirmed: false,
			isNoRoute: false
		};
	},

	render: function() {

		var _username = this.username ;
		var _historyItemComponentData = this.state.historyItems[this.state.currentItemIndex];
		var _flightResult = this.state.isShowMore ? <FlightResult dohopQuery={_historyItemComponentData} /> : <noscript />;

		if (this.state.isNoRoute) {
			return (
				<div className="fy-dashboard-noroute container">
					<div className="fy-dashboard-noroute-title">Looks like you do not have a dream trip here. Please try to add one.</div>
					<Link className="fy-dashboard-noroute-add" to="search">Add</Link>
				</div>
			);
		} else {
			if (_.isUndefined(_historyItemComponentData)) {
				return <noscript />;
			} else {
				// console.log("Dashboard _historyItemComponentData",_historyItemComponentData);
				return (
					<div className="fy-dashboard">
						<div className="fy-dashboard-title">
							<div className="fy-dashboard-title-user">{_username}</div>
							<div className="fy-dashboard-title-subline">Your upcoming dream trips</div>
						</div>
						<HistoryItem 
							key={Utils.generateUniqueKey(DISPLAY_NAME)} 
							departureAirport={_historyItemComponentData.a1}
							returnAirport={_historyItemComponentData.a2}
							dateDeparture={_historyItemComponentData.d1}
							dateReturn={_historyItemComponentData.d2}
							isReturn={_historyItemComponentData.isReturn} 
							expectedPrice={_historyItemComponentData.expectedPrice}
							username={_historyItemComponentData.username}
							routeData={_historyItemComponentData}
							currentItemIndex={this.state.currentItemIndex}
							total={this.state.total}
							isShowMore={this.state.isShowMore}/>
						{_flightResult}
					</div>
				);
			}
		}
	},

	componentDidUpdate: function(nextProps, nextState) {
		if (this.state.isDismissConfirmed) {
			//TODO: this is an error due to this
			this._fetchUserEntryData();
			ConfirmAction.reset();
		}
	},

	componentDidMount: function() {
		this._updateUsername()
		this._fetchUserEntryData();
		DashboardStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		DashboardStore.removeChangeListener(this._onChange);	
	},

	/*==========  Private Method  ==========*/

	_updateUsername: function() {

		if (this.props.query && this.props.query.username && this.props.query.username.length > 0) {
			this.username = this.props.query.username ;
			CookieAction.updateCookie({
				username: this.username
			});
		} else {
			var cookie = CookieStore.readCookie();
			this.username = cookie.username;
		}
	},

	_fetchUserEntryData: function() {
		WebApiAction.post(URL_POST_HISTORY, {username: this.username }, {
			componentKey: KEY
		});
	},

	_getStateFromStores: function() {
		var _response = DashboardStore.getDataFromStore();
		var _historyItems = _response.data;
		var _total = _historyItems.length;
		var _currentItemIndex = _response.currentItemIndex;
		var _isShowMore = _response.isShowMore;
		var _isDismissConfirmed = _response.isDismissConfirmed;
		var _isNoRoute = _response.data.type === 'error'? true: false; 

		return {
			historyItems: _historyItems,
			currentItemIndex: _currentItemIndex,
			total: _total,
			isShowMore: _isShowMore,
			isDismissConfirmed: _isDismissConfirmed,
			isNoRoute: _isNoRoute
		};

	},

	/*==========  Event Handler  ==========*/
	_onChange: function() {

		console.log("Dashboard _onChange _getStateFromStores", this._getStateFromStores());
		this.setState(this._getStateFromStores());
	}

});

module.exports = Dashboard;