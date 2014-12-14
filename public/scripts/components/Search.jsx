/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var merge = require('react/lib/merge');
/*==========  Flux store  ==========*/
var InputStore = require('scripts/stores/InputStore');
var CalendarStore = require('scripts/stores/CalendarStore');
var CookieStore = require('scripts/stores/CookieStore');

/*==========  Flux action  ==========*/
var SearchAction = require('scripts/actions/SearchAction');

var DataConstants = require('scripts/constants/DataConstants');

/*==========  Utils  ==========*/
var Utils = require('scripts/utils/Utils');


/*==========  Components  ==========*/
var InputPage = require('scripts/components/InputPage.jsx');
var Calendar = require('scripts/components/Calendar/index.jsx');

/*==========  LESS  ==========*/
require('styles/search.less');

/*==========  STATIC  ==========*/
var DATE_FORMAT_EXPECTED = "DDMMYYYY";
var SearchDataTypes = DataConstants.SearchDataTypes;
var RT_CONTENT = ['One-way', 'Roundtrip'];

/*==========  CONST  ==========*/
var DEFAULT_PLACEHOLDER_FROM = "NYC";
var DEFAULT_PLACEHOLDER_TO = "SFO";
var DEFAULT_PLACEHOLDER_CALENDAR = CalendarStore.getSelectedDatesWithReadableFormat();

/*==========  Private  ==========*/
var _isRT = true;


/*==========  Components  ==========*/
var SearchPage = React.createClass({


	// React lifecycle
	// 
	mixins: [React.addons.LinkedStateMixin],

	getInitialState: function() {
		var cookie = CookieStore.readCookie();
		// console.log("Search component cookie", cookie);
		var _initialState = {};
		_initialState[SearchDataTypes.FROM] = cookie.a1 ? cookie.a1 : "";
		_initialState[SearchDataTypes.TO] = cookie.a2 ? cookie.a2 : "";
		_initialState[SearchDataTypes.CALENDAR] = "";
		_initialState[SearchDataTypes.RT] = "Roundtrip";
		return _initialState;
	},
	
	componentDidMount: function() {
		InputStore.addChangeListener(this._onChange);
		CalendarStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		InputStore.removeChangeListener(this._onChange);
		CalendarStore.removeChangeListener(this._onChange);
	},

	render: function() {

		return (
			<div>
				<InputPage>
					<div className="fy-search">
						<div className="fy-search-control container">
							<input 
								type="button" 
								className="fy-search-button-isoneway" 
								valueLink = {this.linkState(SearchDataTypes.RT)}
								data-form-type={SearchDataTypes.RT}
								onClick={this._clickOneway}/>
						</div>
						<div className="fy-search-route clearfix container">
							<div className="fy-search-route-from-container col-xs-4">
								<input className="fy-search-route-from " 
									id="form-from"
									type='text' 
									valueLink = {this.linkState(SearchDataTypes.FROM)}
									data-form-type={SearchDataTypes.FROM}
									onFocus={this._onFocus} 
									placeholder={DEFAULT_PLACEHOLDER_FROM} 
									required />
								<label for="form-from">Home</label>

							</div>
							<div className=" col-xs-4">
								<div className="fy-search-route-icon"></div>
							</div>
							<div className="fy-search-route-to-container col-xs-4">
								<input className="fy-search-route-to " 
									id="form-to"
									type='text' 
									valueLink = {this.linkState(SearchDataTypes.TO)}
									data-form-type={SearchDataTypes.TO}
									onFocus={this._onFocus} 
									placeholder={DEFAULT_PLACEHOLDER_TO} />	
								<label for="form-to">Wonderland</label>
							</div>
						</div>

						<div className="fy-search-calendar-container clearfix container">
							<div className="fy-search-calendar">
								<input className="fy-search-calendar-date" 
									id="form-calendar"
									data-form-type={SearchDataTypes.CALENDAR}
									onFocus={this._onFocus}
									placeholder= {DEFAULT_PLACEHOLDER_CALENDAR}
									valueLink = {this.linkState(SearchDataTypes.CALENDAR)} />
								<label for="form-calendar">Your Beach Time</label>
							</div>
						</div>
						<div className="fy-search-button-container clearfix container">
							{this._renderValidSearchButton()}
						</div>
						
						<this.props.activeRouteHandler />
					</div>
				</InputPage>
			</div>
		);
	},

	/*==========  Private Methods  ==========*/
	_renderValidSearchButton: function() {

		if (true) {

			var _selectedDates = CalendarStore.getSelectedDates();
			var _searchData = InputStore.getCreatedSearchData().searchData;
			var _searchPramas = {
				'd1': _selectedDates[0].format(DATE_FORMAT_EXPECTED),
				'd2': _selectedDates.length > 1 ? _selectedDates[1].format(DATE_FORMAT_EXPECTED) : "",
				'a1': _searchData[SearchDataTypes.FROM],
				'a2': _searchData[SearchDataTypes.TO],
				'isReturn': _searchData[SearchDataTypes.RT]
			};

			SearchAction.createSearch(_searchPramas);
			// console.log("_renderValidSearchButton _searchPramas", _searchPramas);
			return <Link to="search-result" query={_searchPramas}>
				<div className="fy-search-button">	
					Take a Peek`
				</div>
			</Link>
		} else {
			return <div className="fy-search-button">	
				Search2
			</div>
		}
	},

	_getStateFromStores: function() {
		var _inputData = InputStore.getCreatedSearchData();
		var _searchData = _inputData.searchData || {};
		var _calendarDates = CalendarStore.getSelectedDatesWithReadableFormat(); /*Get an array of selected dates*/
		var _states = merge(_searchData, {
			CALENDAR: _calendarDates,
			RT: RT_CONTENT[_isRT ? 1 : 0]
		});
		// console.log("Search component _calendarDates", _calendarDates);
		return  _states;
	},

	/*==========  Event Handlers  ==========*/

	_onFocus: function(e) {

		var target = e.target;
		var data = {};
		data.type = target.getAttribute('data-form-type');
		SearchAction.focusInput(data);	
	},

	_clickOneway: function(e) {

		_isRT = !_isRT;
		var target = e.target;
		var data = {};
		data.type = target.getAttribute('data-form-type');
		data.value = _isRT ? 1 : 0;
		SearchAction.clickRTButton(data);
		this.setState({
			RT: RT_CONTENT[_isRT ? 1 : 0]
		});
	}, 
	
	_onChange: function() {
		return this.setState(this._getStateFromStores());
	}

});


module.exports = SearchPage;