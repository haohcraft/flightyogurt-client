/*================================================
=            A Flux store for Dashboard            =
================================================*/
var AppEventEmitter = require('scripts/utils/AppEventEmitter');
var AppDispatcher = require('scripts/dispatcher/FlightYogurtDispatcher');
var AppConstants = require('scripts/constants/AppConstants');
var merge = require('react/lib/merge');

var WebActionTypes = AppConstants.WebActionTypes;
var HistoryItemActionTypes = AppConstants.HistoryItemActionTypes;
var ConfirmActionTypes = AppConstants.ConfirmActionTypes;

/*==========  Constants  ==========*/
var ComponentKeyConstants = require('scripts/constants/ComponentKeyConstants');
var KEY = ComponentKeyConstants.KEY_DASHBOARD;

var _data = {};
var _index = 0;
var _isShowMore = false;
var _isDismissConfirmed = false;

// NOTE: all the public APIs are getters
var DashboardStore = merge(AppEventEmitter, {

	// Public Getter
	getDataFromStore: function() {
		return {
			data: _data, /*hotelItems*/
			currentItemIndex: _index,
			isShowMore: _isShowMore,
			isDismissConfirmed: _isDismissConfirmed
		};
	}

});

DashboardStore.dispatchToekn = AppDispatcher.register(function(payload) {
	var action = payload.action;
	var data = action.data;

	switch(action.type) {

		case WebActionTypes.POST:
			var _options = action.options;
			if (_options.componentKey === KEY) {
				_data = data;
				DashboardStore.emitChange();
			}
			break;
		case WebActionTypes.ERROR:
			_data = data;
			DashboardStore.emitChange();
			break;
		case ConfirmActionTypes.CLICK_CONFIRM:
			_isDismissConfirmed = !_isDismissConfirmed;
			DashboardStore.emitChange();
			break;
		case ConfirmActionTypes.RESET:
			_isDismissConfirmed = false;
			DashboardStore.emitChange();
			break;
		case HistoryItemActionTypes.CLICK_NEXT:
			var _size = _data.length;
			var _currentIndex = data.currentItemIndex;
			var _nextItemIndex = _currentIndex + 1;
			if (_nextItemIndex >= _size) {
				_nextItemIndex = 0; /*Reset if it is the end of the list*/
			}
			_index = _nextItemIndex;
			DashboardStore.emitChange();
			break;
		case HistoryItemActionTypes.CLICK_PRE:
			var _size = _data.length;
			var _currentIndex = data.currentItemIndex;
			var _nextItemIndex = _currentIndex - 1;
			if (_nextItemIndex < 0) {
				_nextItemIndex = _size -1; /*Reset if it is the end of the list*/
			}
			_index = _nextItemIndex;
			DashboardStore.emitChange();
			break;
		case HistoryItemActionTypes.CLICK_MORE: 
			_isShowMore = !_isShowMore;
			DashboardStore.emitChange();
			break;
		default:
			//Do nothing
	}
});

module.exports = DashboardStore;
/*-----  End of A Flux store for Dashboard  ------*/
