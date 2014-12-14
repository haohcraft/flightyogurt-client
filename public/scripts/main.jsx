/**
 * @jsx React.DOM
 */

require('bootstrap/less/bootstrap.less');
require('flat-ui/dist/css/flat-ui.css');
require('zepto/zepto.min.js');
var React = require('react')
// Using react-route
var Router = require('react-router')
var Route = Router.Route
var Routes = Router.Routes
var DefaultRoute = Router.DefaultRoute
var NotFoundRoute = Router.NotFoundRoute

// Attached React to the window 
window.React = React;

React.renderComponent(
	<Routes location="history">
		<Route handler={require('./components/FlightYogurt.jsx')}>
			<DefaultRoute name="welcome" handler={require('./components/Welcome.jsx')} />
			<NotFoundRoute name="notfound" path="404" handler={require('./components/404.jsx')} />

			<Route name="search" handler={require('./components/Search.jsx')}></Route>
			<Route name="search-result" 
					handler={require('./components/SearchResult.jsx')} 
					path="/search-result"/>
			<Route name="faredetail" handler={require('./components/Detail.jsx')} />
			<Route name="dashboard" handler={require('./components/Dashboard.jsx')} />
			<Route name="about" handler={require('./components/About.jsx')} />
		</Route>
	</Routes>
  , document.getElementById('app')
);

