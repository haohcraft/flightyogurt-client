/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
require('styles/footer.less');

var Footer = React.createClass({

	render: function() {
		return (
			<div className="footer">
				<div className="container">
					<Link className="footer-about" to="about">About</Link>&nbsp;|&nbsp;
					<Link className="footer-about" to="search">Search</Link>&nbsp;|&nbsp;
					<Link className="footer-about" to="dashboard">Dashboard</Link>&nbsp;|&nbsp;
					2014 by <a target="_blank" href="https://twitter.com/FlightYogurt" className="author">@FlightYogurt</a>
				</div>
			</div>
		);
	}

});

module.exports = Footer;