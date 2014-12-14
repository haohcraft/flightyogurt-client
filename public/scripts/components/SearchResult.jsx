/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Utils = require('scripts/utils/Utils');
var merge = require('react/lib/merge');
var moment = require('moment');
var cx = React.addons.classSet;
var Router = require('react-router');

/*==========  LESS  ==========*/
require('styles/searchresult.less');
require('styles/animationEnterExit.less');

/*==========  React Component  ==========*/
var FlightResult = require('scripts/components/FlightResult.jsx');
var Confirm = require('scripts/components/Confirm.jsx');

/*==========  Flux action  ==========*/
var WebApiAction = require('scripts/actions/WebApiAction');
var ConfirmAction = require('scripts/actions/ConfirmAction');
var CookieAction = require('scripts/actions/CookieAction');

/*==========  Flux store  ==========*/
var SearchResultStore = require('scripts/stores/SearchResultStore');
var SearchStore = require('scripts/stores/SearchStore');
var CalendarStore = require('scripts/stores/CalendarStore');
var InputStore = require('scripts/stores/InputStore');
var ConfirmStore = require('scripts/stores/ConfirmStore');
var CookieStore = require('scripts/stores/CookieStore');

/*==========  Constants  ==========*/
var DataConstants = require('scripts/constants/DataConstants');
var SearchDataTypes = DataConstants.SearchDataTypes;

var ComponentKeyConstants = require('scripts/constants/ComponentKeyConstants');
var KEY = ComponentKeyConstants.KEY_SEARCH_RESULT;

/*==========  STATIC  ==========*/
var DATE_FORMAT_EXPECTED = "DDMMYYYY";
var URL_POST_YOPRICE = "/api/setuserprice";
var DISPLAY_NAME = "SearchResultPage";

var SearchResultPage = React.createClass({

	displayName: DISPLAY_NAME,

	/*==========  Mixins  ==========*/
	mixins: [React.addons.LinkedStateMixin, Router.Navigation],

	/*==========  Lifecyle  ==========*/
	getInitialState: function() {
		var cookie = CookieStore.readCookie();
		return {
			isConfirmPage: false,
			yoUserName: cookie.username ? cookie.username : "",
			lowPrice: 400,
			buttonContent: 'Confirm'
		};
	},

	render: function() {

		var classSearchResult = cx({
			'fy-searchresult' : true,
			'stay' : true,
			'enter-right': !this.state.isConfirmPage,
			'hide-left': this.state.isConfirmPage
		});

		var classSearchConfirm = cx({
			'fy-searchresult-confirm': true,
			'stay' : true,
			'enter-right': this.state.isConfirmPage,
			'hide-left': !this.state.isConfirmPage
		});

		return <div>
			<div className="fy-searchresult-container clearfix">
				<div className={classSearchResult}>
					<div className="fy-searchresult-form container">
						<div className="fy-searchresult-form-yo">
							<span className="fy-searchresult-form-yo-name">Yo </span>
							to
							<input 
								type="text" 
								ref="username"
								className="fy-searchresult-form-yo-input" 
								placeholder ="Your YO ID"
								valueLink = {this.linkState("yoUserName")} />
							IF <span className="fy-searchresult-form-price-sign">$</span> BELOW 
							<span className="fy-searchresult-form-price-usd">USD</span>
							<input 
								type="number"
								ref="expectedPrice"
								className="fy-searchresult-form-price-input" 
								valueLink = {this.linkState("lowPrice")}/>
						</div>
						<div 
							className="fy-searchresult-form-confirm"
							onClick={this._onConfirmClick}>
							{this.state.buttonContent}
						</div>
					</div>
				</div>
				<div className={classSearchConfirm}>
					{this._getConfirmComponent()}
				</div>
			</div>
			<FlightResult dohopQuery={this.props.query}/>
		</div>

		;
	},

	componentDidMount: function() {
		SearchResultStore.addChangeListener(this._onChange);
		ConfirmStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SearchResultStore.removeChangeListener(this._onChange);	
		ConfirmStore.removeChangeListener(this._onChange);	
	},

	/*==========  Event Handler  ==========*/
	_onChange: function() {
		var _response = SearchResultStore.getDataFromStore();
		this.setState(this._getStateFromStores());
	},

	_onConfirmClick: function(e) {
		e.preventDefault();
		var _storedParams = SearchStore.getSearchParams();
		var _postData = merge(_storedParams, {
			username: this.refs.username.getDOMNode().value.toUpperCase(),
			expectedPrice: this.refs.expectedPrice.getDOMNode().value,
			updated: moment().format("X") /*Unix timestamp*/
		});

		this.setState({
			buttonContent: 'Submiting'
		});

		WebApiAction.post(URL_POST_YOPRICE, _postData, {
			componentKey: KEY
		});

		CookieAction.updateCookie(_postData);
		ConfirmAction.reset();
		
	},

	_onConfirmButtonClicked: function() {
		this.transitionTo('dashboard', {}, {
			username: this.state.yoUserName.toUpperCase()
		});
	},

	/*==========  Private Methods  ==========*/
	_getConfirmComponent : function () {
		if (this.state.isConfirmPage) {
			return <Confirm 
				slogan={this._buildSlogan()}
				confirmButton={{
					callback: this._onConfirmButtonClicked,
					content: "Go to Profile"
				}}/>;
		} else {
			return <noscript />;
		}
	},

	_getStateFromStores: function () {
		
		var _confirmBackButtonClickStatus = ConfirmStore.getBackClickStatus();
		var _response = SearchResultStore.getDataFromStore();
		var _responseData = _response.data;
		var _flag = _responseData.flag;
		var _buttonContent = 'Done' ;

		if (_flag != 1) {
			_buttonContent = "Retry";
		} else if (_responseData.type === "update") {
			_buttonContent = "Update";
		}

		return {
			buttonContent: _buttonContent,
			isConfirmPage: _flag === 1 && !_confirmBackButtonClickStatus
		};

	},

	_buildSlogan: function () {
		return (
			<span>
				You're <span className="fy-confirm-slogan-blue">all set</span>! The rest is on <span className="fy-confirm-slogan-blue">us</span>. 
				Go grab a <span className="fy-confirm-slogan-purple">yogurt</span> to enjoy your life. <span className="fui-heart"></span>
			</span>
		);
	}

});

module.exports = SearchResultPage;