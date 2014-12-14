/**
 * Config
 */
"use strict";

var log = require('debug')('flightyogurt:config');
var bodyParser     = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var morgan         = require('morgan');
var lessMiddleware = require('less-middleware');
var session = require('express-session');
var errorHandler = require('errorhandler');
var flash    = require('connect-flash');
var config = {};



module.exports = Config;

function Config (app) {
	
	config = require('./config.js');
	var dirname = app.get('root');

	//==================================== all environments
	//app.set('config', config);
	app.use(function (req, res, next) {
	    res.locals.config = config;
	    next();
  	});
	app.set('port', config.app.port);

	app.set('view engine', 'hbs');
	app.engine('hbs', require('hbs').__express);

	app.use(morgan('dev'));
	app.use(bodyParser());
	app.use(cookieParser());
	app.use(session({ 
	  secret: 'haohcraft.com',
	  cookie: {maxAge: 24*60*60*1000}

	})); // session secret
	app.use(flash()); // use connect-flash for flash messages stored in session
	app.use(methodOverride());

	app.use(lessMiddleware(dirname + '/public'));
	app.use(require('express').static(dirname + '/dist'));
	//====================Yo setup
  	app.set('yo_config', config.yo);

  	// development only
	if ('development' == (process.env.NODE_ENV || 'development')) {
	  app.use(errorHandler());
	}


	//========Start
	var server = app.listen(app.get('port'), function() {
	    log('Listening on port %d', app.get('port'));
	});
		







}