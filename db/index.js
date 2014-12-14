/**
 * [mongo description] For db
 * @type {[type]}
 */
var mongo = require('mongoskin');

var dbcfg = {
	user: "MONGODB_USER_NAME",
	password: 'YOUR_PW',
	url: 'YOUR_DB_URL'
};

module.exports = mongo.db(
	'mongodb://'
	+dbcfg.user
	+':'
	+dbcfg.password
	+'@'
	+dbcfg.url
	);