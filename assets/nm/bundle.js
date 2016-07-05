webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	var _TrackListView = __webpack_require__(4);

	var _TrackListView2 = _interopRequireDefault(_TrackListView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(main);

	function main() {
	    var trackListView = new _TrackListView2.default();

	    $.ajax({
	        url: "http://music.163.com/api/playlist/detail?id=93914274"
	    }).then(function (res) {
	        trackListView.tracks(res.result.tracks);
	    });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TrackListView = function () {
	    function TrackListView() {
	        _classCallCheck(this, TrackListView);

	        this._tracks = [];
	        this.$element = $("<ul/>");
	        this.$element.addClass("nm-track-list-view");
	    }

	    _createClass(TrackListView, [{
	        key: "_removeAllTracks",
	        value: function _removeAllTracks() {
	            this.$element.children("li").remove();
	        }
	    }, {
	        key: "_addTracks",
	        value: function _addTracks(tracks) {
	            var _this = this;

	            tracks.forEach(function (track) {
	                _this._addTrack(track);
	            });
	        }
	    }, {
	        key: "_addTrack",
	        value: function _addTrack(track) {
	            var $li = $("\n            <li class=track>\n                <a href=" + track.mp3Url + ">\n                    <span class=name>" + track.name + "</span>\n                </a>\n            </li>\n        ");

	            this.$element.append($li);
	        }
	    }, {
	        key: "tracks",
	        get: function get() {
	            return this._tracks;
	        },
	        set: function set(tracks) {
	            this._tracks = tracks;
	            this._removeAllTracks();
	            this._addTracks(this._tracks);
	        }
	    }]);

	    return TrackListView;
	}();

	exports.default = TrackListView;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);