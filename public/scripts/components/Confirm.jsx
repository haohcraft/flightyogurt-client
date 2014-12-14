/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link
/*==========  Flux Action  ==========*/
var ConfirmAction = require('scripts/actions/ConfirmAction');
/*==========  Flux Store  ==========*/
var CookieStore = require('scripts/stores/CookieStore');

/*==========  LESS  ==========*/
require('styles/confirm.less');

var Confirm = React.createClass({

	propTypes: {

		/**
		 * `slogan` for the slogan
		 */
		slogan: React.PropTypes.object,

		/**
		 * `confirmButton` for the second action button
		 */
		confirmButon: React.PropTypes.object
	},

	render: function() {

		var cookie = CookieStore.readCookie();
		var username = (this.props.query && this.props.query.username.length > 0 )? this.props.query.username : cookie.username;
		return (
			<div className="fy-confirm container">
				<div className="fy-confirm-slogan">{this.props.slogan}</div>
				<div className="fy-confirm-action-container">
					<div className="fy-confirm-action-back" onClick={this._onBackClick}>Back</div>
					<div className="fy-confirm-action-dashboard" onClick={this.props.confirmButton.callback}>{this.props.confirmButton.content}
					</div>
				</div>
			</div>
		);
	},

	/*==========  Event Handler  ==========*/
	_onBackClick: function() {
		ConfirmAction.clickBack();

	},

	_onConfirmClick: function() {
		ConfirmAction.clickConfirm();
	}

});

module.exports = Confirm;