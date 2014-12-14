/**
 * Routes
 */

"use strict";
var ApiUser = require('./api/user');
var LocationSuggestionAPI = require('../lib/location');

function Routes (app) {
	
	app.get('/*', function(req, res, next) {
	    if (req.headers.host.match(/^www\./) != null) {
	      res.redirect("http://" + req.headers.host.slice(4) + req.url, 301);
	    } else {
	      next();
	    }
	});


	
	/*==========  API  ==========*/
	app.get('/api/locationSuggestion', function(req, res, next) {
		var locationSuggestionTool = new LocationSuggestionAPI();
		locationSuggestionTool.getLocationSuggestion(req._parsedUrl.query, function(data) {
			res.status(200).send(data);
		});
	});

	app.post('/api/archiveUserEntry', ApiUser.archiveUserMonitoryEntry);
	app.post('/api/setuserprice', ApiUser.createUserMonitorEntry);

	app.post('/api/getuserhistory', ApiUser.getUserMonitorHistory);
	
	app.post('/api/getroute', ApiUser.getRouteDB);
	
	/*==========  Route for `react-route`  ==========*/

	// The endpoint for user to YO us
	app.get('/yoservice', ApiUser.checkIsNewUser);

	
	// Note: the "/*" is necessary here for 'react-route' 
	app.get('/*', function(req, res, next) {
		var _yoUser = req.query.username ? req.query.username : "";
		res.render("pages/home",{
			username: _yoUser.toUpperCase()
		});
	});
};

module.exports = Routes;