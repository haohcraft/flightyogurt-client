
"use strict";

var LinkUtils = LinkUtils || {};

var BASE_URL = "http://flightyogurt.haohcraft.com";

LinkUtils.generateLink = function (type, username) {

	var url = BASE_URL;
	if (type) {
		url = url + "/" + type;
	} 

	url = url + "?username=" + username;

	return url;
};

module.exports = LinkUtils;