/*====================================
=            API for user            =
====================================*/
"use strict";

var UserModelDB = require('../../db/model/user-flight.js');
var RouteDataLegacyDB = require('../../db/model/route-data-legacy.js');
var RouteDataDB = require('../../db/model/route-data.js');

var merge = require('../../node_modules/react/lib/merge');
var Yo = require('../../lib/yo');
var LinkUtils = require('../../lib/linkUtils');
var moment = require('moment');
var async = require('async');
var _ = require('underscore');
var config = require("../../config/config.js");
var Util = require("../../lib/fare/lib/util.js");
var YoAPI = require('yo-api');

/*==========  Static  ==========*/
var FORMAT_DEFAULT = "DDMMYYYY";
var FORMAT_EXPECTED = "YYYY-MM-DD";


/**
 * [Deprecated]
 */
var getRouteHistoryFromLegacyDB = function(routeData, callback) {

	var a1 = routeData.a1
		, a2 = routeData.a2
		, d1 = routeData.d1
		, d2 = routeData.d2
		, isReturn = routeData.isReturn;

	var legacyEntryQuery = a1 
						+ a2 
						+ moment(d1, FORMAT_DEFAULT).format(FORMAT_EXPECTED) 
						+ moment(d2, FORMAT_DEFAULT).format(FORMAT_EXPECTED);
	var entryRegx = new RegExp(legacyEntryQuery, "i");				
	// console.log("entryRegx: ", entryRegx.toString());
	RouteDataLegacyDB.findData({
		entry: entryRegx
	}, {}, function(err, items) {
		
		var priceChanges = [];

		if (!err && items.length > 0) {
			for (var key in items) {
				var _item = {
					changeDate: items[key].created,
					price: items[key].price
				}

				priceChanges.push(_item);
			}
		}

		callback(priceChanges);
	});

};

var getRouteHistoryDB = function(routeData, callback) {

	var a1 = routeData.a1
		, a2 = routeData.a2
		, d1 = moment(routeData.d1, FORMAT_DEFAULT).format(FORMAT_EXPECTED)
		, d2 = moment(routeData.d2, FORMAT_DEFAULT).format(FORMAT_EXPECTED)
		, isReturn = routeData.isReturn;
	
	// console.log("getRouteHistoryDB routeData", routeData);
	RouteDataDB.findData({
		a1: a1,
		a2: a2,
		d1: d1,
		d2: d2

	}, {sort: {"updated": -1}}, function(err, items) {

		var priceChanges = [];

		if (!err && items.length > 0) {
			for (var key in items) {
				var _item = {
					changeDate: items[key].updated,
					price: items[key].price
				};

				priceChanges.push(_item);
			}
		}

		callback(priceChanges);
	});	
};

exports.getRouteDB = function(req, res, next) {

	var _routeData = req.body;

	getRouteHistoryDB(_routeData, function(priceChanges) {
		// console.log("getRouteHistoryDB priceChanges", priceChanges);
		res.status(200).send(priceChanges);
	});

}

/**
 * Get users' monitor history
 * @param  {[type]}   req
 * @param  {[type]}   res
 * @param  {Function} next
 * @return {[type]}
 */
exports.getUserMonitorHistory = function(req, res, next) {
	var user = req.body;
	// console.log("getUserMonitorHistory body", req.body);
	if (user.username && user.username.length > 0) {
		UserModelDB.findData({

			username: user.username,
			a1: {$exists: true},
			a2: {$exists: true},
			d1: {$exists: true},
			d2: {$exists: true},
			expectedPrice: {$exists: true},
			isReturn: {$exists: true},
			isArchived : {$exists: false}

		}, {sort: {"updated": -1}}, function(err, items) {
			if (!err) {
				if (items.length > 0) {

					// console.log("getUserMonitorHistory items", items);
					res.status(200).send(items);

				} else {
					
					res.status(500).send({
						flag: 0,
						type: 'nohistory'
					});
				}

			} else {
				res.status(500).send({
					flag: 0,
					type: 'error',
					response: err
				});
			}
		});
	}
};

exports.archiveUserMonitoryEntry = function(req, res, next) {
	var userMonitoryParams = req.body;
	var query = _.pick(userMonitoryParams, "d1", "d2", "a1", "a1", "username");
	UserModelDB.updateData(query, {
		$set: {
			isArchived: "1"
		}
	}, function(err, result) {
		if (!err) {
			res.status(200).send({
				flag: 1,
				type: "archived"
			});
		} else {
			res.status(500).send({
				flag: 0,
				type: "archiveFailed"
			});
		}
	});

};

/**
 * Create an user monitor entry
 * @param  {[type]}   req
 * @param  {[type]}   res
 * @param  {Function} next
 * @return {[type]}
 */
exports.createUserMonitorEntry = function(req, res, next) {

	var userMonitoryParams = req.body;
	if (userMonitoryParams.username && userMonitoryParams.username.length > 0) {
		//Check its existence and then try to update the 'expectedPrice'
		//
		var userMonitoryParamsForLookup = _.pick(userMonitoryParams, 'd1', 'd2', 'a1', 'a2','username');
		var userMonitoryParams = _.omit(userMonitoryParams, 'created', '_id');
		// console.log("Copy userMonitoryParamsForLookup", userMonitoryParamsForLookup);
		// console.log("Copy userMonitoryParams", userMonitoryParams);
		
		UserModelDB.findData({username: userMonitoryParams.username}, {}, function(err, items) {
			if (!err && items.length === 0) {
				// Yo user
				var yo = new YoAPI(config.yo.api_token); 
				var username = userMonitoryParams.username;
				yo.yo_link(username, Util.generateDashboardUrl(username), function() {
					console.log("Yo new user  the confirm link %s", username);
					//TODO: update the lowest fare in DB
					//Note: we should only update the one already sent out
				});
			}
		});

		UserModelDB.findData(userMonitoryParamsForLookup, {}, function(err, items) {
			// console.log("UserModelDB findData", err);
			// console.log("UserModelDB findData", items);
			if (!err) {
				if (items.length === 0) {

					// Insert new data
					UserModelDB.insertData(userMonitoryParams, function(err) {
						if (err) {
							console.log("Failed to create user monitor entry");
							res.status(500).send({
								flag: 0,
								type: 'new'
							});
						} else {
							
							res.status(200).send({
								flag: 1,
								type: 'new'
							});
						}

					});
				} else {
				// Update the data
				UserModelDB.updateData(userMonitoryParamsForLookup, 
					userMonitoryParams, function(err) {
						if (err) {
							res.status(500).send({
								flag: 0,
								type: 'update'
							});
							
						} else {
							res.status(200).send({
								flag: 1,
								type: 'update'
							});
						}
					});
				}
			} else {
				// console.log(err);
				res.status(500).send({
					flag: 0,
					types: "error",
					response: err
				});
			}
		});
	} else {
		res.status(500).send({
			flag: 0,
			type: 'nouser'
		});
	}
};


/**
 * Check whether this user has already existed or not
 * @param  {[type]}   req
 * @param  {[type]}   res
 * @param  {Function} next
 * @return {[type]}
 */
exports.checkIsNewUser = function (req, res, next) {

	var query = req.query;
	var yoUser = "";
	var url = "";

	if (query && query.username && query.username.length > 0) {

		yoUser = query.username.toUpperCase();
		// yoUser = "NBDAV";
		UserModelDB.findData({
			username: yoUser
		}, {}, function(err, items) {

			if (!err) {
				if (items.length === 0) {
					// New user
					url = LinkUtils.generateLink(null, yoUser);
					Yo.yoUser(yoUser, url, function() {
						console.log("Yo a new user %s the welcome page %s", yoUser, url);
					} );
					res.send(200);
				} else {
					url = LinkUtils.generateLink('dashboard', yoUser);
					Yo.yoUser(yoUser, url, function() {
						console.log("Yo an existing user %s the profile page %s", yoUser, url);
					} );
					res.send(200);
				}
			} else {
				res.send(404);
			}
		});
	} else {
		// console.log("no username go to default page");
		res.render("pages/home",{
			username: yoUser.toUpperCase()
		});
	}
}


/*-----  End of API for user  ------*/

