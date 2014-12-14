/**
 * Main entry
 */

"use strict";

var log = require('debug')('flightyogurt:main');
var express = require('express');
var CronJob = require('node-cron').CronJob;
var Yo = require('./lib/yo');
var app = express();

// set base root
app.set('root', __dirname);

// Configuration

// 
require('./config')(app);


// Routes
require('./routes')(app);
