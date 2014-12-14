/**
 * @jsx React.DOM
 */

require('styles/header.less');

var React = require('react')
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({

	render: function() {
		return (
			<div className='fy-header'>
		        <div className="container">
					<Link to="/" className="fy-header-logo" href="#">
						<img src="images/icon.svg" alt="FLIGHTYOGURT"></img>
					</Link>
		        </div>
		    </div>
		);
	}

});

module.exports = Header;