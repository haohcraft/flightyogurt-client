/**
 * @jsx React.DOM
 */

var React = require('react');
var LocationSuggestionAction = require("scripts/actions/LocationSuggestionAction");
var LocationSuggestionStore = require('scripts/stores/LocationSuggestionStore');
/*==========  LESS  ==========*/
require('styles/locationsuggestion.less');
/*==========  Static  ==========*/
var URL_LOCATION_SUGGESTION = "/api/locationSuggestion";

var LocationSuggestion = React.createClass({

	displayName: "LocationSuggestion",

	propTypes: {

		/**
		*
		* `query` for the location suggestion
		*
		**/
		query: React.PropTypes.string,

		/**
		 * `suggestionType` for the type of suggestion, like `FROM` or `TO`
		 */
		suggestionType: React.PropTypes.string
		
	},

	/*==========  React Lifecyle  ==========*/
	getInitialState: function() {
		return this._getStateFromStores();
	},
	getDefaultProps: function() {
		return {
			query: "BOS",
			suggestionType: "FROM"
		};
	},

	componentWillReceiveProps: function(nextProps) { /*This method is not called for the initial render.*/
		//TODO: Need to user RxJS to optimize this
		var _query = nextProps.query;
		if (_query && _query.length > 0 && this.state.shouldDisplay) {

			$.ajax({
				type: 'GET',
				url: URL_LOCATION_SUGGESTION,
				//data: {name:  _query}, /*For ITA Matrix location autocomplete*/
				data: {loc: _query},
				dataType: 'json', 
				success: function(data) {
					LocationSuggestionAction.updateSuggestion(data);
				},
				error: function(xhr, type) {
					console.log("Failed to fetch the locationSuggestion data");
				}
			});	
		} else {
			LocationSuggestionAction.updateSuggestion(null);
		}
	},

	componentWillMount: function() {
		LocationSuggestionStore.addChangeListener(this._onChange);
	},

	render: function() {
		return <div className="fy-locationsuggestion-list">
			{this._renderResultLists()}
		</div>;
	},
	componentWillUnmount: function() {
		LocationSuggestionStore.removeChangeListener(this._onChange);
	},

	/*==========  Private Methods  ==========*/
	_renderResultLists: function () {
		// console.log("_renderResultLists", this.state.results);
		var _locationSuggestions = <noscript />;
		if (this.state.results && this.state.results.length > 0 && this.state.shouldDisplay) {
			_locationSuggestions = this.state.results.map(function(result) {
				return <button key={result.id}   /*To make the item `clickable` on mobile, `button` is used instead.*/
				className="fy-locationsuggestion-list-item"
				data-location-code={result.code}
				data-location-id={result.id}
				onClick={this._onListItemSelect}>
					{result.description}
				</button>;
			}, this/*The `this` is for this._onListItemSelect*/);
		}

		return _locationSuggestions;
		
	},

	_getStateFromStores: function() {
		return LocationSuggestionStore.getLocationSuggestion();
	},

	/*==========  Event Handler  ==========*/
	_onChange: function() {
		this.setState(
			this._getStateFromStores()
		);
	},
	_onListItemSelect: function (e) {
		e.preventDefault();
		var _target = e.target;
		if (_target) {
			var _selectedItem = {
				id: _target.getAttribute('data-location-id'),
				value: _target.getAttribute('data-location-code'),
				type: this.props.suggestionType
			};
			LocationSuggestionAction.selectListItem(_selectedItem);
		}
	}
	
});

module.exports = LocationSuggestion;