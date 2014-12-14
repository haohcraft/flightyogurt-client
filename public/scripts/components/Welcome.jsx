/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
//LESS
require('styles/welcome.less');

/*==========  Flux Action  ==========*/
var CookieAction = require('scripts/actions/CookieAction');

var WelcomePage = React.createClass({

	componentDidMount: function() {

		if (this.props.query && this.props.query.username &&this.props.query.username.length > 0) {
			CookieAction.updateCookie({
				username: this.props.query.username
			});
		}
	},

	render: function() {
		return (
			<section className="fy-welcome">
				<div className="fy-welcome-intro">
					We help watch your  
					<span className="fy-welcome-intro-highlight-blue"> flight price </span><span className="fy-welcome-intro-highlight-purple">24/7</span> before your booking 
					for <span className="fy-welcome-intro-highlight-blue"> free</span>.<br></br>Once the  
						<span className="fy-welcome-intro-highlight-blue"> $ </span> drops below your setting you will get 
					<br></br>
					<span className="fy-welcome-intro-highlight-purple"> YO </span>’d!
				</div>
				<div className="fy-welcome-start">
					<Link className="fy-welcome-start-button" to="search">Now</Link>
				</div>
				<div className="clearfix"></div>
				<div className="fy-welcome-slogan ">
					<div>Search&nbsp;|&nbsp;Save&nbsp;|&nbsp;Explore</div>
				</div>
				<div className="container">
					<div className="fy-welcome-search row">
						<div className="fy-welcome-search-content-container col-sm-6">
							<div className="fy-welcome-search-content">
								<div className="fy-welcome-search-content-header">Search</div>
								<div className="fy-welcome-search-content-description">Find a<span className="purple">&nbsp;World&nbsp;</span>from your <span className="purple">&nbsp;Home&nbsp;</span></div>
							</div>
						</div>
						<div className="fy-welcome-search-gif-container col-sm-6">
							<div className="fy-welcome-search-gif-iphone-frame">
								<div className="fy-welcome-search-gif-iphone-frame-inner">
									<div className="fy-welcome-search-gif"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="clearfix"></div>
					<div className="fy-welcome-search row">
						<div className="fy-welcome-search-content-container col-sm-6">
							<div className="fy-welcome-search-content">
								<div className="fy-welcome-search-content-header">Save</div>
								<div className="fy-welcome-search-content-description">Take Care of Your<span className="purple">&nbsp;Dream Trips&nbsp;</span>in your <span className="purple">&nbsp;Pocket&nbsp;</span>with One<span className="purple">&nbsp;Tap&nbsp;</span></div>
							</div>
						</div>
						<div className="fy-welcome-search-gif-container col-sm-6">
							<div className="fy-welcome-search-gif-iphone-frame">
								<div className="fy-welcome-search-gif-iphone-frame-inner">
									<div className="fy-welcome-search-gif-2"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="clearfix"></div>
					<div className="fy-welcome-search row">
						<div className="fy-welcome-search-content-container col-sm-6">
							<div className="fy-welcome-search-content">
								<div className="fy-welcome-search-content-header">Explore</div>
								<div className="fy-welcome-search-content-description">Get to Know the <span className="purple">Other Side</span> of the World with a <span className="purple">&nbsp;Cheap&nbsp;</span> Flight</div>
							</div>
						</div>
						<div className="fy-welcome-search-gif-container col-sm-6">
							<div className="fy-welcome-search-gif-city"></div>
						</div>
					</div>
				</div>
				<div className="clearfix"></div>
				<div className="fy-welcome-start">
					<Link className="fy-welcome-start-button" to="search">Now</Link>
				</div>
			</section>
		);
	}

});

module.exports = WelcomePage;