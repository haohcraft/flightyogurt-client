/**
 * YO
 */

"use strict";

var YoMonitor = require('./api/yo-monitor.js');

var Yo = {};

Yo.watch = function (userData) {
	var y = new YoMonitor();
	y.watchAllUsers(userData);
}

Yo.yoAll = function (link) {
	var y = new YoMonitor();
	y.yoAll(link);
};

Yo.yoUser = function(username, link, cb) {
	var y = new YoMonitor();
	y.yoUser(username, link, cb);
};

module.exports = Yo;
