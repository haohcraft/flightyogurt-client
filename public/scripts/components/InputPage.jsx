/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var merge = require('react/lib/merge');
var cx = React.addons.classSet;

/*==========  Components  ==========*/
Calendar = require('scripts/components/Calendar/index.jsx');
/*==========  Flux Store  ==========*/
var LocationSuggestion = require('scripts/components/LocationSuggestion.jsx');

/*==========  Flux constants  ==========*/
var DataConstants = require('scripts/constants/DataConstants');

/*==========  Flux stores  ==========*/
var InputStore = require('scripts/stores/InputStore');

/*==========  Flux action  ==========*/
var SearchAction = require('scripts/actions/SearchAction');
var InputAction = require('scripts/actions/InputAction');
var CookieAction = require('scripts/actions/CookieAction');

/*==========  STATIC  ==========*/
var SearchDataTypes = DataConstants.SearchDataTypes;
var ENTER_KEY_CODE = 13;
/*==========  LESS  ==========*/
require('styles/inputpage.less');


var InputPage = React.createClass({

	displayName: "InputPage",

	/*==========  Mixins  ==========*/
	mixins: [React.addons.LinkedStateMixin],

	/*==========  Properties  ==========*/

	/*==========  React Lifecyle  ==========*/
	getInitialState: function() {
		return this._getStateFromStores();
	},

	componentDidMount: function() {
		InputStore.addChangeListener(this._onChange);
		SearchAction.addSearch();

	},

	componentWillUnmount: function() {
		InputStore.removeChangeListener(this._onChange);	
	},

	componentDidUpdate: function(prevProps, prevState) {
		if (this.refs.inputField) {
			this.refs.inputField.getDOMNode().focus();
		}
	},


	render: function() {
		return (
			<div className="fy-inputpage">
				{this._renderMain()}
			</div>
		);
	},

	/*==========  Private Methods  ==========*/

	_renderMain: function() {
		
		var _placeHolder = "city or airport";
		switch (this.state.inputType) {
			case SearchDataTypes.FROM:
				_placeHolder = "Departure " + _placeHolder;
				break;
			case SearchDataTypes.TO:
				_placeHolder = "Arrival " + _placeHolder;
				break;
			default:
				// Do nothing

		};

		if(!this.state.isHiddenInput ) {

			if (this.state.inputType === SearchDataTypes.FROM || this.state.inputType === SearchDataTypes.TO ) {

				var deleteCx = cx({
					"fy-inputpage-field-delete": true,
					"shown": this.state.inputValue && this.state.inputValue.length > 0
				});

				return <div>
					<div className="fy-inputpage-container container">

						<input 
							ref="inputField" 
							className="fy-inputpage-field col-xs-10" 
							type="text"
							valueLink = {this.linkState("inputValue")} 
							placeholder={_placeHolder}
							data-form-type={this.state.inputType}
							onKeyDown = {this._onKeyDown}/>

						<div className={deleteCx} 
							onClick={this._onDeleteClick}>
							<span className="fui-cross"></span>
						</div>
						
					</div>
					<LocationSuggestion query={this.state.inputValue} suggestionType={this.state.inputType} />
				</div>
			}

			if (this.state.inputType === SearchDataTypes.CALENDAR) {
				return <Calendar />;
			}
		} else {
			return <div>
				{this.props.children}
			</div>
		}

		return <noscript />;
	},

	_getStateFromStores: function() {

		var _searchData = InputStore.getCreatedSearchData();
		var _inputType = InputStore.getSearchInputType();
		var _inputValue = _searchData.searchData != null ? _searchData.searchData[_inputType] : "";

		return {
			isHiddenInput: InputStore.getIsHiddenInput(),
			inputType: _inputType,
			inputValue: _inputValue
		};
	},

	_saveInput: function() {
		var data = {};
		data.type = this.refs.inputField.getDOMNode().getAttribute('data-form-type');
		data.value = this.refs.inputField.getDOMNode().value;
		/**
			TODO:
			- Need to validate the data before saving
		**/
		CookieAction.updateCookie(data);
		InputAction.saveInput(data);
	},

	/*==========  Event Handler  ==========*/

	_onKeyDown: function(e) {
		if (e.keyCode === ENTER_KEY_CODE) {
			e.preventDefault();
			this._saveInput();
			InputAction.clickClose();
		}
	},

	_onDeleteClick: function() {
		// NOTE: we can just this.setState({inputValue: ""}), but below is more flux style
		var data = {};
		data.type = this.refs.inputField.getDOMNode().getAttribute('data-form-type');
		data.value = "";
		InputAction.saveInput(data);
	},	

	_onChange: function() {
		this.setState(
			this._getStateFromStores()
		);
	},

	_onInputValid: function() {}

});

module.exports = InputPage;