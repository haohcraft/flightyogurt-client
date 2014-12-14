/**
 * An eventEmitter for the app
 */

var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var CHANGE_EVENT = 'change';

var AppEventEmitter = merge(EventEmitter.prototype, {

	/**
	 * Emit the `change` event
	 * @return {[type]} [description]
	 */
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	/**
	* @param {function} callback
	*/
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**
	* @param {function} callback
	*/
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

module.exports = AppEventEmitter;