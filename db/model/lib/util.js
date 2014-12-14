/**
 * Model for forms
 * @type {[type]}
 */
var Model = require('./base');


var	UtilModel = function(collection) {

	this.model = new Model(collection);

}
/**
 * Insert Data in to the Model
 * @param  {Object}   data     e.g. {first_name: "Hao", last_name: "Huang"}
 * @param  {Function} callback 
 * @return {[type]}            [description]
 */
UtilModel.prototype.insertData = function(data, callback) {

	// console.log('UtilModel.insertData',data);

	data["created"] = new Date();

	this.model.insert(data, callback);

}

/**
 * Find data in the db by req
 * @param  {Object}   req      e.g.. {email:"haohcraft@gmail.com"}
 * @param  {Object} action e.g. {sort: {"date": -1}, limit: 2}
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
UtilModel.prototype.findData = function(req, action, callback) {

	// console.log('UtilModel.findData', req);
	var _action = {};

	if (action != null) {
		_action = action;
	}
	
	this.model.find(req, _action).toArray(function(err, items){

		// console.log('UtilModel.findData:items', items);

		callback(err, items);

	});
}

UtilModel.prototype.updateData = function (req, updateQuery ,callback) {

	this.model.update(req, updateQuery, {upsert: true}, function (err, result) {

		// console.log('UtilModel.updateData:err&result',err, result);
		callback(err, result);
	
	});

}

module.exports = UtilModel;


