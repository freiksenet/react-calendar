(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "moment"], factory);
	else if(typeof exports === 'object')
		exports["ReactCalendar"] = factory(require("react"), require("moment"));
	else
		root["ReactCalendar"] = factory(root["React"], root["moment"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Calendar = __webpack_require__(1);

	Object.defineProperty(exports, 'Calendar', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Calendar).default;
	  }
	});

	var _Month = __webpack_require__(6);

	Object.defineProperty(exports, 'Month', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Month).default;
	  }
	});

	var _Week = __webpack_require__(8);

	Object.defineProperty(exports, 'Week', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Week).default;
	  }
	});

	var _Day = __webpack_require__(9);

	Object.defineProperty(exports, 'Day', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Day).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _moment2 = __webpack_require__(3);

	var _moment3 = _interopRequireDefault(_moment2);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _util = __webpack_require__(5);

	var _Month = __webpack_require__(6);

	var _Month2 = _interopRequireDefault(_Month);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Calendar = function (_Component) {
	  _inherits(Calendar, _Component);

	  function Calendar(props, context) {
	    _classCallCheck(this, Calendar);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Calendar).call(this, props, context));
	  }

	  _createClass(Calendar, [{
	    key: 'moment',
	    value: function moment() {
	      var localMoment = _moment3.default.apply(null, arguments);

	      localMoment.locale(this.props.locale);

	      return localMoment;
	    }
	  }, {
	    key: 'renderHeader',
	    value: function renderHeader() {
	      return _react2.default.createElement(
	        'header',
	        { key: 'header', className: (0, _classnames2.default)('rc-Calendar-header') },
	        this.moment(this.props.date).format(this.props.yearHeaderFormat)
	      );
	    }
	  }, {
	    key: 'getMonthRange',
	    value: function getMonthRange() {
	      var focus = this.moment(this.props.date || this.props.startDate).startOf('month');
	      var start = this.moment(this.props.startDate);
	      var end = this.moment(this.props.endDate);
	      var size = end.diff(start, 'month') + 1;

	      return Array(size).fill(0).map(function (n, i) {
	        return focus.clone().add(n + i, 'months');
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var mods = this.props.mods;

	      var monthMods = (0, _util.getModsByCompType)('month', mods);
	      var weekMods = (0, _util.getModsByCompType)('week', mods);
	      var dayMods = (0, _util.getModsByCompType)('day', mods);

	      return _react2.default.createElement(
	        'div',
	        null,
	        this.renderHeader(),
	        this.getMonthRange().map(function (date, i) {
	          return _react2.default.createElement(_Month2.default, { key: 'month-' + i,
	            date: date,
	            weekNumbers: _this2.props.weekNumbers,
	            mods: monthMods,
	            week: weekMods,
	            day: dayMods });
	        })
	      );
	    }
	  }]);

	  return Calendar;
	}(_react.Component);

	Calendar.propTypes = {
	  startDate: _react.PropTypes.object.isRequired,
	  endDate: _react.PropTypes.object.isRequired,
	  weekNumbers: _react.PropTypes.bool,
	  locale: _react.PropTypes.string,
	  month: _react.PropTypes.array,
	  yearHeaderFormat: _react.PropTypes.string
	};
	Calendar.defaultProps = {
	  locale: 'en',
	  yearHeaderFormat: 'YYYY'
	};
	exports.default = Calendar;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var bindEvents = function bindEvents(events, date) {
	  var boundEvents = {};

	  if (!events) return null;

	  Object.keys(events).forEach(function (key) {
	    return boundEvents[key] = events[key].bind(null, date);
	  });

	  return boundEvents;
	};

	var getClsMods = function getClsMods(clsPrefix, mods) {
	  return !mods || !mods.classNames ? null : mods.classNames.map(function (cls) {
	    return clsPrefix + '--' + cls;
	  });
	};

	/**
	  * Internal: Creates a single modifier object for a date
	  */
	var getModByDate = function getModByDate(mods, date, type) {
	  var modifier = {
	    date: null,
	    classNames: [],
	    events: {}
	  };

	  mods.filter(function (mod) {
	    return mod.date ? mod.date.isSame(date, type) : null;
	  }).forEach(function (_mod) {
	    modifier.date = _mod.date;
	    modifier.events = _mod.events;
	    if (Array.isArray(_mod.classNames)) {
	      var _modifier$classNames;

	      (_modifier$classNames = modifier.classNames).push.apply(_modifier$classNames, _toConsumableArray(_mod.classNames));
	    }
	  });

	  return modifier;
	};

	var getModsWithDateRange = function getModsWithDateRange(mods) {
	  return mods.filter(function (mod) {
	    return !!mod.startDate;
	  });
	};

	var explodeDateRanges = function explodeDateRanges(mods) {
	  return mods.map(function (mod) {
	    var diff = mod.endDate.diff(mod.startDate, 'days');

	    if (!diff) {
	      // if the diff is 0 just return the mod
	      mod.date = mod.startDate.clone();
	      return mod;
	    }

	    return Array(diff).fill(mod).map(function (mod, i) {
	      return _extends({}, mod, {
	        date: mod.startDate.clone().add(i, 'days')
	      });
	    });
	  }).reduce(function (a, b) {
	    return a.concat(b);
	  }, []);
	};

	var getModsWithSingleDate = function getModsWithSingleDate(mods) {
	  return mods.filter(function (mod) {
	    return !mod.startDate && mod.date;
	  });
	};

	var getModsWithoutDate = function getModsWithoutDate(mods) {
	  return mods.filter(function (mod) {
	    return !mod.date;
	  });
	};

	var getModsByCompType = exports.getModsByCompType = function getModsByCompType(componentType, mods) {
	  if (!Array.isArray(mods)) {
	    return [];
	  }

	  return mods.filter(function (_ref) {
	    var component = _ref.component;
	    return component.indexOf(componentType.toLowerCase()) > -1;
	  });
	};

	var getMods = exports.getMods = function getMods(mods, date, clsPrefix, type) {
	  if (!mods) {
	    return null;
	  }

	  var events = {};
	  var exploded = explodeDateRanges(getModsWithDateRange(mods));
	  var mod = getModByDate([].concat(_toConsumableArray(mods), _toConsumableArray(exploded)), date, type);
	  var clsMods = getClsMods(clsPrefix, mod) || [];
	  var clsCompMods = getClsMods(clsPrefix, getModsWithoutDate(mods)) || [];

	  getModsWithoutDate(mods).forEach(function (mod) {
	    return Object.assign(events, bindEvents(mod.events, date));
	  });

	  if (mod && mod.events) {
	    Object.assign(events, bindEvents(mod.events, date));
	  }

	  return { clsMods: [].concat(_toConsumableArray(clsMods), _toConsumableArray(clsCompMods)), events: events };
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _dateUtils = __webpack_require__(7);

	var _util = __webpack_require__(5);

	var _Week = __webpack_require__(8);

	var _Week2 = _interopRequireDefault(_Week);

	var _Day = __webpack_require__(9);

	var _Day2 = _interopRequireDefault(_Day);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var clsPrefix = 'rc-Month';

	var renderWeekHeader = function renderWeekHeader(props) {
	  return _react2.default.createElement(
	    'div',
	    { className: clsPrefix + '-weekdays' },
	    (0, _dateUtils.daysOfWeek)(props.date).map(function (weekday, i) {
	      return _react2.default.createElement(
	        'div',
	        { key: 'weekday-header-' + i, className: (0, _classnames2.default)(clsPrefix + '-weekdays-weekday') },
	        weekday.format(props.weekdayFormat)
	      );
	    })
	  );
	};

	var renderHeader = function renderHeader(props) {
	  if (props.renderHeader) {
	    return props.renderHeader(props);
	  }

	  if (!props.monthNames) {
	    return null;
	  }

	  return _react2.default.createElement(
	    'header',
	    { key: 'header', className: (0, _classnames2.default)(clsPrefix + '-header') },
	    props.date.format(props.monthNameFormat)
	  );
	};

	var Month = function Month(props) {
	  var date = props.date;
	  var weekNumbers = props.weekNumbers;

	  var edges = (0, _dateUtils.monthEdges)(date);

	  var mods = props.mods;
	  var day = props.day;
	  var week = props.week;

	  var clsMods = void 0,
	      events = void 0;

	  if (!props.day) {
	    day = (0, _util.getModsByCompType)('day', mods);
	  }

	  if (!props.week) {
	    week = (0, _util.getModsByCompType)('week', mods);
	  }

	  if (!props.day || !props.week) {
	    // this means we're probably just rendering a single month and need to filter our component types again.
	    mods = (0, _util.getModsByCompType)('month', mods);
	  }

	  var fWeekMods = week.filter(function (mod, j) {
	    return mod.date ? mod.date.isSame(date, 'month') : true;
	  });
	  var fDayMods = day.filter(function (mod, k) {
	    return mod.date ? mod.date.isSame(date, 'month') : true;
	  });

	  var modifiers = (0, _util.getMods)(mods, date, clsPrefix, 'month');

	  if (modifiers) {
	    clsMods = modifiers.clsMods;
	    events = modifiers.events;
	  }

	  return _react2.default.createElement(
	    'div',
	    _extends({ className: (0, _classnames2.default)(clsPrefix, clsMods) }, events),
	    renderHeader(props),
	    renderWeekHeader(props),
	    (0, _dateUtils.weeksOfMonth)(props.date).map(function (wDate, i) {
	      return _react2.default.createElement(_Week2.default, { key: 'week-' + i,
	        date: wDate,
	        edges: edges,
	        weekNumbers: weekNumbers,
	        mods: fWeekMods,
	        day: fDayMods });
	    })
	  );
	};

	Month.propTypes = {
	  monthNames: _react.PropTypes.bool,
	  monthNameFormat: _react.PropTypes.string,
	  weekdayNames: _react.PropTypes.bool,
	  weekdayFormat: _react.PropTypes.string,
	  mod: _react.PropTypes.object
	};

	Month.defaultProps = {
	  monthNames: true,
	  monthNameFormat: 'MMMM YYYY',
	  weekdayNames: true,
	  weekdayFormat: 'dd'
	};

	exports.default = Month;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.weeksOfMonth = weeksOfMonth;
	exports.monthEdges = monthEdges;
	exports.daysOfWeek = daysOfWeek;

	var _moment = __webpack_require__(3);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** Returns moment objects for first day of each week of the month.
	 *  Can return moments from previous month if week start is in them.
	 *  @param {string|Date|moment} month any date in a month to create weeks for
	 */
	function weeksOfMonth(month) {
	  var thisMonth = month.month();
	  var weeks = [];

	  month = (0, _moment2.default)(month).startOf('month').startOf('week');

	  do {
	    weeks.push(month.clone());
	    month.add(1, 'week');
	  } while (month.month() === thisMonth);

	  return weeks;
	}

	/** Returns moments for each day that is not in the month, but is part of
	 *  weeks that are.
	 *  Week contents is locale aware.
	 *  @param {string|Date|moment} moment any date in the target month
	 */
	function monthEdges(month) {
	  var start = (0, _moment2.default)(month).startOf('month').startOf('week');
	  var end = (0, _moment2.default)(month).endOf('month').endOf('week');

	  var result = [];

	  while (start.month() !== month.month()) {
	    result.push(start.clone());
	    start.add(1, 'day');
	  }

	  while (end.month() !== month.month()) {
	    result.push(end.clone());
	    end.subtract(1, 'day');
	  }

	  return result;
	}

	/** Returns moment objects for each day of the week.
	 *  Ordering is locale aware.
	 *  @param {string|Date|moment} week any date in a week to create days for
	 */
	function daysOfWeek(week) {
	  week = (0, _moment2.default)(week).startOf('week');

	  return Array(7).fill(0).map(function (n, i) {
	    return week.clone().add(n + i, 'day');
	  });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _util = __webpack_require__(5);

	var _dateUtils = __webpack_require__(7);

	var _Day = __webpack_require__(9);

	var _Day2 = _interopRequireDefault(_Day);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var clsPrefix = 'rc-Week';

	var makeWeekNumber = function makeWeekNumber(props) {
	  if (!props.weekNumbers) {
	    return null;
	  }

	  return _react2.default.createElement(
	    'div',
	    { key: 'weekNumber', className: (0, _classnames2.default)(clsPrefix + '-number') },
	    props.date.format(props.weekNumberFormat)
	  );
	};

	var renderWeekHeader = function renderWeekHeader(props) {
	  if (!props.weekHeader) {
	    return null;
	  }

	  return _react2.default.createElement(
	    'div',
	    { className: clsPrefix + '-weekdays' },
	    (0, _dateUtils.daysOfWeek)(props.date).map(function (weekday, i) {
	      return _react2.default.createElement(
	        'div',
	        { key: 'weekday-header-' + i, className: (0, _classnames2.default)(clsPrefix + '-weekdays-weekday') },
	        weekday.format(props.weekdayFormat)
	      );
	    })
	  );
	};

	var Week = function Week(props) {
	  var mods = props.mods;
	  var date = props.date;
	  var clsMods = void 0;var events = void 0;var week = void 0;var day = props.day;


	  week = (0, _util.getModsByCompType)('week', mods);
	  var modifiers = (0, _util.getMods)(week, date, clsPrefix, 'week');

	  if (modifiers) {
	    clsMods = modifiers.clsMods;
	    events = modifiers.events;
	  }

	  if (!props.day) {
	    day = (0, _util.getModsByCompType)('day', mods);
	  }

	  return _react2.default.createElement(
	    'div',
	    _extends({ key: 'days', className: (0, _classnames2.default)(clsPrefix, clsMods) }, events),
	    renderWeekHeader(props),
	    makeWeekNumber(props),
	    _react2.default.createElement(
	      'div',
	      { className: (0, _classnames2.default)(clsPrefix + '-days') },
	      (0, _dateUtils.daysOfWeek)(props.date).map(function (date, i) {
	        var outside = void 0;

	        if (props.edges) {
	          outside = Boolean(props.edges.find(function (edge, j) {
	            return edge.isSame(date, 'month', 'week', 'year');
	          }));
	        }

	        return _react2.default.createElement(_Day2.default, { outside: !!outside, key: 'day-' + i, date: date, mods: day });
	      })
	    )
	  );
	};

	Week.propTypes = {
	  weekHeader: _react.PropTypes.bool,
	  weekNumbers: _react.PropTypes.bool,
	  weekNumberFormat: _react.PropTypes.string,
	  weekdayFormat: _react.PropTypes.string
	};

	Week.defaultProps = {
	  weekHeader: false,
	  weekNumbers: false,
	  weekNumberFormat: 'w',
	  weekdayFormat: 'dd'
	};

	exports.default = Week;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(4);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _util = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var clsPrefix = 'rc-Day';

	var renderHeader = function renderHeader(props) {
	  if (!props.dayHeader) {
	    return null;
	  }

	  return _react2.default.createElement(
	    'header',
	    { className: clsPrefix + '-Day-header' },
	    props.date.format(props.dayHeaderFormat)
	  );
	};

	var renderAgenda = function renderAgenda(props) {
	  if (!props.dayAgenda) {
	    return null;
	  }

	  return _react2.default.createElement(
	    'div',
	    { key: 'agenda', className: clsPrefix + '-Day-agenda' },
	    props.children
	  );
	};

	var Day = function Day(props) {
	  var clsPrefix = 'rc-Day';
	  var date = props.date;
	  var mods = props.mods;
	  var outside = props.outside;

	  var modifiers = (0, _util.getMods)(mods, date, clsPrefix, 'day');

	  var clsMods = void 0,
	      events = void 0;

	  if (modifiers) {
	    clsMods = modifiers.clsMods;
	    events = modifiers.events;
	  }

	  var clsDay = (0, _classnames2.default)(clsPrefix, { 'rc-Day--outside': outside }, clsMods);

	  return _react2.default.createElement(
	    'div',
	    _extends({ className: clsDay }, events),
	    renderHeader(props),
	    date.format(props.dayFormat),
	    renderAgenda(props)
	  );
	};

	Day.propTypes = {
	  date: _react2.default.PropTypes.object.isRequired,
	  dayAgenda: _react2.default.PropTypes.bool,
	  dayHeader: _react2.default.PropTypes.bool,
	  dayHeaderFormat: _react2.default.PropTypes.string,
	  dayFormat: _react2.default.PropTypes.string,
	  mods: _react.PropTypes.array
	};

	Day.defaultProps = {
	  dayAgenda: false,
	  dayHeader: false,
	  dayHeaderFormat: 'MMM Do',
	  dayFormat: 'D'
	};

	exports.default = Day;

/***/ }
/******/ ])
});
;