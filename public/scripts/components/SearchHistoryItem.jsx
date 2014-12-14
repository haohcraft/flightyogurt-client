/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var moment = require('moment');
var Utils = require('scripts/utils/Utils');
var Router = require('react-router');
var Link = Router.Link
var cx = React.addons.classSet;
var _ = require('underscore');
var merge = require('react/lib/merge');
/*==========  LESS  ==========*/
require('styles/historyitem.less');

/*==========  Components  ==========*/
var Sparkline = require('scripts/components/Sparkline.jsx');	
var Confirm = require('scripts/components/Confirm.jsx');	

/*==========  Flux stores  ==========*/
var WebApiAction = require('scripts/actions/WebApiAction');
var HistoryItemStore = require('scripts/stores/HistoryItemStore');
var ConfirmStore = require('scripts/stores/ConfirmStore');
/*==========  Flux actions  ==========*/
var HistoryItemAction = require('scripts/actions/HistoryItemAction');
var ConfirmAction = require('scripts/actions/ConfirmAction');

/*==========  Static  ==========*/
var URL_POST_HISTORY = '/api/getroute';
var URL_ARCHIVE_USERENTRY = '/api/archiveUserEntry';
var URL_POST_YOPRICE = "/api/setuserprice";
var DISPLAY_NAME = "SearchHistoryItem";

/*==========  Constants  ==========*/
var ComponentKeyConstants = require('scripts/constants/ComponentKeyConstants');
var KEY = ComponentKeyConstants.KEY_HISTORY_ITEM;

var SearchHistoryItem = React.createClass({

	displayName: DISPLAY_NAME,

	/*==========  Mixins  ==========*/
	mixins: [React.addons.LinkedStateMixin, Router.Navigation],

	propTypes: {

		/**
		*
		* `departureAirport` for the departure airport
		*
		**/
		departureAirport: React.PropTypes.string,

		/**
		 * `dateDeparture` for the departure date
		 */
		dateDeparture: React.PropTypes.string,

		/**
		 * `dateReturn` for the return date
		 * @type {[type]}
		 */
		dateReturn: React.PropTypes.string
	},

	threadKey: null,

	/*==========  React Lifecycle  ==========*/
	getInitialState: function() {
		return {
			priceChanges: [] ,
			currentItemIndex: 0,
			isConfirmPage: false,
			isDismissClicked: false,
			expectedPrice: this.props.expectedPrice,
			updateButtonContent: "Update"
		};
	},

	render: function() {

		var _route = this.props.departureAirport + " - " +this.props.returnAirport;
		var _dateDeparture = moment(this.props.dateDeparture, "DDMMYYYY").format("MMM DD") ;
		var _dateReturn = this.props.isReturn === '1' ? moment(this.props.dateReturn, "DDMMYYYY").format("MMM DD") : "ONEWAY";
		var _priceChanges = this.state.priceChanges;
		var _index = this.props.currentItemIndex;

		var _cxNext = cx({
			"fy-history-item-next": true,
			"shown": this.props.total !== 1
		});

		var _cxPre = cx({
			"fy-history-item-pre": true,
			"shown":  this.props.total > 1
		});

		var _cxPrice = cx({
			'fy-history-item-price-container' : true,
			'stay' : true,
			'hide-left': this.state.isConfirmPage
		});

		var _cxConfirm = cx({
			'fy-history-item-confirm': true,
			'stay' : true,
			'enter-right': this.state.isConfirmPage,
			'hide-left': !this.state.isConfirmPage
		});

		// console.log("SearchHistoryItem _index", _cxPre);
		return (
				<div className="fy-history-item container" 
					data-index={_index}
					ref="historyItem">

					<div className="fy-history-item-head row">
						<Link className="fy-history-item-add" to='search'>
							<span className="fui-plus"></span>
						</Link>
						<div className="fy-history-item-route-container">
							<div className="fy-history-item-route ">{_route}</div>
							<div className="fy-history-item-date ">{_dateDeparture} － {_dateReturn}</div>
						</div>
						
						<div className={_cxNext} onClick={this._onClickNext}>
							<span className="fui-arrow-right"></span>
						</div>
						<div className="fy-history-item-page">{_index + 1}/{this.props.total}</div>
						<div className={_cxPre} onClick={this._onClickPre}>
							<span className="fui-arrow-left"></span>
						</div>
					</div>
					<div className={_cxPrice}>
						<div className="fy-history-item-price clearfix">
							<span>IF BELOW $</span>
							<input 
								ref="expectedPrice"
								className="fy-history-item-price-expected"
								valueLink = {this.linkState("expectedPrice")} />
							<div 
								className="fy-history-item-price-update"
								onClick={this._onClickUpdate}>{this.state.updateButtonContent}</div>
						</div>
						{this._buildPriceChanges(_priceChanges)}
					</div>
					{this._buildItemController()}
					<div className={_cxConfirm}>
						{this._getConfirmComponent()}
					</div>
				</div>
		);
	},

	componentDidMount: function() {
		this.threadKey = Utils.generateUniqueKey(DISPLAY_NAME);
		HistoryItemStore.addChangeListener(this._onChange);
		ConfirmStore.addChangeListener(this._onChange);
		WebApiAction.post(URL_POST_HISTORY, this.props.routeData, {
			componentKey: KEY,
			threadKey: this.threadKey
		});	
	},

	componentWillUnmount: function() {
		HistoryItemStore.removeChangeListener(this._onChange);	
		ConfirmStore.removeChangeListener(this._onChange);
	},

	/*==========  Event Handler  ==========*/

	_onClickUpdate: function() {
		var newExpectedPrice = this.refs.expectedPrice.getDOMNode().value;
		var postParams = merge(this.props.routeData, {
			expectedPrice : newExpectedPrice
		});
		

		WebApiAction.post(URL_POST_YOPRICE, postParams, {
			componentKey: KEY
		});		
	},

	_onClickDismiss: function() {
		// HistoryItemAction.clickDismiss();
		var _currentIsConfirmPage = this.state.isConfirmPage;
		
		this.setState({
			isConfirmPage: !_currentIsConfirmPage
		});

	},

	_onClickMore: function() {
		HistoryItemAction.clickMore();
	},

	_onClickNext: function() {
		var _currentItemIndex = this.refs.historyItem.getDOMNode().getAttribute('data-index');
		HistoryItemAction.clickNext({
			currentItemIndex: parseInt(_currentItemIndex, 10)
		});
	},

	_onClickPre: function() {
		var _currentItemIndex = this.refs.historyItem.getDOMNode().getAttribute('data-index');
		HistoryItemAction.clickPre({
			currentItemIndex: parseInt(_currentItemIndex, 10)
		});
	},

	_onChange: function() {

		var _response = HistoryItemStore.getDataFromStore();
		
		// console.log("_getStateFromStores _response", _response);
		// console.log("_getStateFromStores _response threadKey", this.threadKey);
		if (!_response.threadKey && _response.data.flag === 1 && _response.data.type === "update") {
			this.setState({
				updateButtonContent: "Done"
			});
		}

		if (_response.threadKey === this.threadKey ) {
			// console.log("_getStateFromStores _response", _response);
			this.setState({
				priceChanges: _response.data,
				isConfirmPage: _response.isConfirmPage
			});
		}
	},

	_onConfirmButtonClicked: function() {
		WebApiAction.post(URL_ARCHIVE_USERENTRY, this.props.routeData, {});		
		ConfirmAction.clickConfirm();
	},

	/*==========  Private Method  ==========*/
	_getStateFromStores: function() {
		var _response = HistoryItemStore.getDataFromStore();
		return {
			data: _response
		};

	},

	_getConfirmComponent : function () {
		if (this.state.isConfirmPage) {
			return <Confirm 
				slogan={this._buildSlogan()}
				confirmButton={{
					callback: this._onConfirmButtonClicked,
					content: "Confirm"
				}}/>;
		} else {
			return <noscript />;
		}
	},

	_buildSlogan: function () {
		return (
			<span>
				Are you sure to <span className="fy-confirm-slogan-blue">dismiss</span> this alert?
			</span>
		);
	},

	_buildItemController: function() {
		if (!this.state.isConfirmPage) {
			var _moreButtonContent = this.props.isShowMore ? "Less" : "More";

			return <div className="fy-history-item-control row clearfix">
				<div className="fy-history-item-control-more"
					onClick={this._onClickMore}>{_moreButtonContent}</div>
				<div className="fy-history-item-control-dismiss"
					onClick={this._onClickDismiss}>Dismiss</div>
			</div>;
		} else {
			return <noscript />;
		}
	},

	_buildPriceChanges: function(priceChanges) {
		return <Sparkline 
			className="fy-history-item-price-sparkline"
			data={priceChanges} 
			circleDiameter={5}
			height={100}
			strokeColor={'#2980B9'}
			strokeWidth={'2px'}/>;
	}
});

module.exports = SearchHistoryItem;