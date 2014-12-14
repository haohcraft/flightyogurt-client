/**
 * Yo Monitor
 * Credit from https://github.com/simplyianm/yo-reddit/blob/master/server/app.js
 * - used to passively crawl the flight fares
 */

"use strict";

var log = require('debug')('flightyogurt:yomonitor');
var config = require("../../../config/config.js");
var Yo = require('yo-api');
var Users = null;
var INTERVAL_TIME = 1000 * 60 * 60 ; // 1 hour 


/**
 * [YoMonitor description]
 * 
 * @param {[type]} usersWithData 
 * The Data structure 
 * [
 * 	{username: xx, userinfo: [{'option': {'from':'JFK', 'to':'SFO','date_departure':'2014-12-22','date_return':'2014-12-26'}, 'lowest': '123'}, {'option': {'from':'JFK', 'to':'SFO','is_oneway':'o'}, 'lowest': '123'}]},
 * 	{username: xx, userinfo: [{'option': {'from':'JFK', 'to':'SFO'}, 'lowest': '123'}, {'option': {'from':'JFK', 'to':'SFO','is_oneway':'o'}, 'lowest': '123'}]}, 
 * 	{username: xx, userinfo: [{'option': {'from':'JFK', 'to':'SFO'}, 'lowest': '123'}, {'option': {'from':'JFK', 'to':'SFO','is_oneway':'o'}, 'lowest': '123'}]}
 * ]
 */
var YoMonitor = function () {
		
	this.yo = new Yo(config.yo.api_token);

}
/**
 * Monitor the flights for all users
 * @return {[type]} [description]
 */
YoMonitor.prototype.watchAllUsers = function(usersData) {
	Users = usersData;
	setInterval(yoUsers, INTERVAL_TIME);
	yoUsers();
}

YoMonitor.prototype.yoAll = function(link) {

	if (link) {
		this.yo.yo_all_link(link);
	} else {
		log("Yo all without a link");
		this.yo.yo_all();
	}

}

YoMonitor.prototype.yoUser = function(username, link, cb) {
	if (username && link) {
		this.yo.yo_link(username, link, cb);
	}
}

YoMonitor.prototype._isUpdate = function() {

}

module.exports = YoMonitor;


