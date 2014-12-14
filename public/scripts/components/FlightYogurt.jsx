/**
 * @jsx React.DOM
 */

var React = require('react');
var Router = require('react-router');
var Link = Router.Link
var Header = require("./Header.jsx");
var Footer = require("./Footer.jsx");

//LESS
require('styles/main.less');

var FlightYogurt = React.createClass({

  render: function() {
    return (
      <div className="flightyogurt">
        <Header title="FlightYogurt" />
        	{this.props.activeRouteHandler()}
        <Footer />
      </div>
    );
  }

});

module.exports = FlightYogurt;