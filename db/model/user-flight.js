/**
 Model for the flight optins per user ordered by the date
 
 For example:
 var userData = [
  	{
  		username: "haohyo", 
  		userinfo: [
  			{
          'option': {'from':'BOS', 'to':'SFO','date_departure':'2014-12-22','date_return':'2014-12-26'}, 
          'lowest': 400
  			}
  		]
  	}
  ];
 */

var UtilModel = require('./lib/util');

var UserFlightModel = new UtilModel("UserMonitorParams");


module.exports = UserFlightModel;