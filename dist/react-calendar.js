(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("react"), require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "react", "moment"], factory);
	else if(typeof exports === 'object')
		exports["ReactCalendar"] = factory(require("lodash"), require("react"), require("moment"));
	else
		root["ReactCalendar"] = factory(root["_"], root["React"], root["moment"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
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

	"use strict";

	module.exports = {
	  Calendar: __webpack_require__(1),
	  Month: __webpack_require__(2),
	  Week: __webpack_require__(3),
	  Day: __webpack_require__(4),
	  dateUtils: __webpack_require__(5)
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(6);
	var React = __webpack_require__(7);
	var moment = __webpack_require__(8);

	var CalendarBaseMixin = __webpack_require__(9);
	var propTypes = __webpack_require__(10);
	var ClassNameMixin = __webpack_require__(11);
	var Month = React.createFactory(__webpack_require__(2));

	var Calendar = React.createClass({displayName: "Calendar",
	  mixins: [
	    CalendarBaseMixin,
	    propTypes.Mixin(false,
	      'Calendar',
	      'Year',
	      'Month',
	      'Week',
	      'Day'
	    ),
	    ClassNameMixin
	  ],

	  makeHeader: function (classes) {
	    if (this.getPropOrCtx('yearHeader')) {
	      return (
	        React.createElement("header", {key: "header", 
	                className: classes.descendant('header')}, 
	          this.props.date.format(this.getPropOrCtx('yearHeaderFormat'))
	        )
	      );
	    } else {
	      return null;
	    }
	  },

	  getChildContext:function(){
	    return this.getCalendarCtx();
	  },

	  getMonthRange: function () {
	    var range, left, right;
	    var focus = this.moment(this.props.date).startOf('month');
	    var size = this.getPropOrCtx('size');
	    var firstMonth = this.getPropOrCtx('firstMonth') - 1;

	    if (_.isNumber(firstMonth) && size === 12) {
	      var focusMonth = focus.month();
	      if (focusMonth < firstMonth) {
	        left = focusMonth + (12 - firstMonth);
	      } else {
	        left = focusMonth - firstMonth;
	      }
	      left = -left;
	      right = size + left;
	    } else if (firstMonth === 'current') {
	      left = 0;
	      right = size;
	    } else {
	      var half = size / 2;
	      left = -Math.floor(half);
	      right = Math.ceil(half);
	    }
	    return _.range(left, right).map(function(offset)  {
	      return focus.clone().add(offset, 'months');
	    });
	  },

	  render: function () {
	    var classes = this.className({
	      modifiers: this.props.modifiers,
	      classes: this.props.classes
	    });
	    var childrenMap = this.splitChildrenByDate(Month);
	    var months = this.getMonthRange().map(
	      this.makeDirectChild.bind(this, childrenMap, Month)
	    );

	    var props = _.assign({
	      className: classes()
	    }, this.getEventHandlers());

	    return React.DOM.div(props, [
	      this.makeHeader(classes),
	      months
	    ]);
	  }
	});

	module.exports = Calendar;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(6);
	var React = __webpack_require__(7);

	var dateUtils = __webpack_require__(5);
	var CalendarBaseMixin = __webpack_require__(9);
	var propTypes = __webpack_require__(10);
	var ClassNameMixin = __webpack_require__(11);
	var Week = React.createFactory(__webpack_require__(3));
	var Day = React.createFactory(__webpack_require__(4));

	var Month = React.createClass({displayName: "Month",
	  mixins: [
	    CalendarBaseMixin,
	    propTypes.Mixin(true,
	      'Month',
	      'Week',
	      'Day'
	    ),
	    ClassNameMixin
	  ],

	  createMonthEdge: function (date, i) {
	    return Day({
	      key: 'edge-' + i,
	      date: date,
	      modifiers: {outside: true}
	    });
	  },

	  makeHeader: function (classes) {
	    if (this.getPropOrCtx('monthNames')) {
	      return (
	        React.createElement("header", {key: "header", 
	                className: classes()}, 
	          this.props.date.format(this.getPropOrCtx('monthNameFormat'))
	        )
	      );
	    } else {
	      return null;
	    }
	  },

	  makeWeekHeader: function (classes) {
	    if (this.getPropOrCtx('weekdayNames')) {
	      var week = dateUtils.daysOfWeek(this.props.date);
	      var weekEls = week.map(function(w, i)  {
	        return (
	          React.createElement("div", {key: i, 
	               className: classes.descendant('weekday')()}, 
	            w.format(this.getPropOrCtx('weekdayFormat'))
	          )
	        );
	      }.bind(this));
	      return (
	        React.createElement("header", {key: "weekdays", 
	                className: classes()}, 
	          weekEls
	        )
	      );
	    } else {
	      return null;
	    }
	  },

	  getChildContext:function(){
	    return this.getCalendarCtx();
	  },

	  render: function () {
	    var classes = this.className({
	      modifiers: this.props.modifiers,
	      classes: this.props.classes
	    });

	    var childrenMap = this.splitChildrenByDate(
	      Week,
	      dateUtils.monthEdges(this.props.date).map(this.createMonthEdge)
	    );
	    var weeks = dateUtils.weeksOfMonth(this.props.date).map(
	      this.makeDirectChild.bind(this, childrenMap, Week)
	    );

	    var props = _.assign({
	      className: classes()
	    }, this.getEventHandlers());

	    return React.DOM.div(props, [
	      this.makeHeader(classes.descendant('header')),
	      this.makeWeekHeader(classes.descendant('weekdays')),
	      weeks
	    ]);
	  }
	});

	module.exports = Month;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(6);
	var React = __webpack_require__(7);

	var dateUtils = __webpack_require__(5);
	var CalendarBaseMixin = __webpack_require__(9);
	var propTypes = __webpack_require__(10);
	var ClassNameMixin = __webpack_require__(11);
	var Day = React.createFactory(__webpack_require__(4));

	var Week = React.createClass({displayName: "Week",
	  mixins: [
	    CalendarBaseMixin,
	    propTypes.Mixin(true,
	      'Week',
	      'Day'
	    ),
	    ClassNameMixin
	  ],

	  makeWeekNumber: function (classes) {
	    if (this.getPropOrCtx('weekNumbers')) {
	      return (
	        React.createElement("div", {key: "weekNumber", 
	             className: classes.descendant('number')()}, 
	          this.props.date.format(this.getPropOrCtx('weekNumberFormat'))
	        )
	      );
	    } else {
	      return null;
	    }
	  },
	  getChildContext:function(){
	    return this.getCalendarCtx();
	  },

	  render: function () {
	    var classes = this.className({
	      modifiers: this.props.modifiers,
	      classes: this.props.classes
	    });

	    var childrenMap = this.splitChildrenByDate(Day);
	    var days = dateUtils.daysOfWeek(this.props.date).map(
	      this.makeDirectChild.bind(this, childrenMap, Day)
	    );

	    var props = _.assign({
	      className: classes()
	    }, this.getEventHandlers());

	    return React.DOM.div(props, [
	      this.makeWeekNumber(classes),
	      React.createElement("div", {key: "days", className: classes.descendant('days')}, 
	        days
	      )
	    ]);
	  }
	});

	module.exports = Week;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(6);
	var React = __webpack_require__(7);

	var propTypes = __webpack_require__(10);
	var ClassNameMixin = __webpack_require__(11);

	var Day = React.createClass({displayName: "Day",
	  mixins: [propTypes.Mixin(true,
	    'Day'
	  ), ClassNameMixin],

	  makeHeader: function (classes) {
	    if (this.getPropOrCtx('dayHeader')) {
	      return (
	        React.createElement("header", {className: classes()}, 
	          this.props.date.format(this.getPropOrCtx('dayHeaderFormat'))
	        )
	      );
	    } else {
	      return null;
	    }
	  },

	  makeBody: function (classes) {
	    return (
	      React.createElement("span", {key: "body", 
	            className: classes()}, 
	        this.props.date.format(this.getPropOrCtx('dayFormat'))
	      )
	    );
	  },

	  makeAgenda: function (classes) {
	    if (this.getPropOrCtx('dayAgenda')) {
	      return (
	        React.createElement("div", {key: "agenda", 
	             className: classes()}, 
	          this.props.children
	        )
	      );
	    } else {
	      return null;
	    }
	  },
	  getChildContext:function(){
	    return this.getCalendarCtx();
	  },

	  render: function () {
	    var classes = this.className({
	      modifiers: this.props.modifiers,
	      classes: this.props.classes
	    });

	    var props = _.assign({
	      className: classes()
	    }, this.getEventHandlers());

	    return React.DOM.div(props, [
	      this.makeHeader(classes.descendant('header')),
	      this.makeBody(classes.descendant('body')),
	      this.makeAgenda(classes.descendant('agenda'))
	    ]);
	  }
	});

	module.exports = Day;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(6);
	var moment = __webpack_require__(8);

	module.exports = {
	  /** Returns moment objects for first day of each week of the month.
	   *  Can return moments from previous month if week start is in them.
	   *  @param {string|Date|moment} month any date in a month to create weeks for
	   */
	  weeksOfMonth: function (month) {
	    var thisMonth = month.month();
	    var weeks = [];

	    month = moment(month).startOf('month').startOf('week');

	    do {
	      weeks.push(month.clone());
	      month.add(1, 'week');
	    } while (month.month() === thisMonth)

	    return weeks;
	  },

	  /** Returns moments for each day that is not in the month, but is part of
	   *  weeks that are.
	   *  Week contents is locale aware.
	   *  @param {string|Date|moment} moment any date in the target month
	   */
	  monthEdges: function (month) {
	    var start = moment(month).startOf('month').startOf('week');
	    var end = moment(month).endOf('month').endOf('week');

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
	  },

	  /** Returns moment objects for each day of the week.
	   *  Ordering is locale aware.
	   *  @param {string|Date|moment} week any date in a week to create days for
	   */
	  daysOfWeek: function (week) {
	    week = moment(week).startOf('week');
	    return _.range(0, 7).map(function(day)  {
	      return week.clone().add(day, 'day');
	    });
	  }
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(6);
	var React = __webpack_require__(7);
	var moment = __webpack_require__(8);

	var dateToComponentMap = {
	  Month: 'YYYY-MM',
	  Week: 'gggg-ww',
	  Day: 'YYYY-DDDD'
	};

	var CalendarBaseMixin = {
	  moment: function () {for (var args=[],$__0=0,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
	    var localMoment = moment.apply(this, args);
	    localMoment.locale(this.getPropOrCtx('locale'));
	    return localMoment;
	  },

	  splitChildrenByDate: function (comp, children) {
	    var compType = comp().type;
	    if (!children) {
	      children = [];
	    }
	    React.Children.forEach(this.props.children, function(child)  {
	      children.push(child);
	    });

	    var result = {
	      thisGlobals: [],
	      nextGlobals: []
	    };
	    var dateString = dateToComponentMap[compType.displayName];
	    children.forEach(function(child)  {
	      if (child.props.date) {
	        var childDate = child.props.date.format(dateString);
	        var existing = result[childDate] || {
	          thisLevel: [],
	          nextLevels: []
	        };
	        if (child.type === compType) {
	          existing.thisLevel.push(child);
	        } else {
	          existing.nextLevels.push(child);
	        };
	        result[childDate] = existing;
	      } else if (child.type === compType) {
	        result.thisGlobals.push(child);
	      } else {
	        result.nextGlobals.push(child);
	      }
	    });

	    return result;
	  },

	  makeDirectChild: function (childrenMap, comp, date, key) {
	    var dateString = date.format(dateToComponentMap[comp().type.displayName]);
	    var props = {
	      key: key,
	      date: date
	    };

	    var thisChildren = childrenMap[dateString] || {};
	    var thisLevel = childrenMap.thisGlobals.concat(
	      thisChildren.thisLevel || []
	    );
	    var children = childrenMap.nextGlobals.concat(
	      thisChildren.nextLevels || []
	    );

	    thisLevel.forEach(function(child)  {
	      React.Children.forEach(child.props.children, function(childChild)  {
	        children.push(childChild);
	      });
	      var mergedProps = ['modifiers', 'classes'].reduce(function(merged, propKey)  {
	        if (props.hasOwnProperty(propKey) &&
	            child.props.hasOwnProperty(propKey)) {
	          merged[propKey] = _.assign({},
	            props[propKey],
	            child.props[propKey]
	          );
	        }
	        return merged;
	      }, {});
	      props = _.assign({}, child.props, props, mergedProps);
	    });


	    return comp(props, children);
	  }
	};

	module.exports = CalendarBaseMixin;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(6);
	var React = __webpack_require__(7);
	var moment = __webpack_require__(8);

	var momentOrString = function (props, propName, component) {
	  var prop = props[propName];
	  var valid = (
	    (prop === undefined) ||
	    moment.isMoment(prop) ||
	    (prop instanceof Date) ||
	    (prop instanceof String)
	  );
	  if (!valid) {
	    return new Error(
	      "Invalid prop " + propName + " passed to " + component
	    );
	  } else {
	    return true;
	  }
	};

	var momentOrStringRequired = function (props, propName, component) {
	  if (props[propName] === undefined) {
	    return new Error (
	      propName + " is required in " + component
	    );
	  } else {
	    return true;
	  }
	};

	module.exports = {
	  types: {},
	  defaults: {}
	};

	module.exports.types.Generic = {
	  classNamespace: React.PropTypes.string,
	  classNameOptions: React.PropTypes.object,
	  locale: React.PropTypes.oneOfType([
	    React.PropTypes.string,
	    React.PropTypes.arrayOf(React.PropTypes.string)
	  ]),
	  modifiers: React.PropTypes.object,
	  classes: React.PropTypes.object,
	  moment: React.PropTypes.instanceOf(moment),
	  date: momentOrStringRequired
	};

	module.exports.defaults.Generic = {
	  classNamespace: 'rc',
	  locale: 'en',
	  modifiers: {},
	  classes: {}
	};

	module.exports.types.Calendar = {
	  minDate: momentOrString,
	  maxDate: momentOrString,
	  size: React.PropTypes.number,
	  firstMonth: React.PropTypes.oneOf([
	    'center',
	    'current',
	    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
	  ])
	};

	module.exports.defaults.Calendar = {
	  size: 12,
	  firstMonth: 'center'
	};

	module.exports.types.Year = {
	  yearHeader: React.PropTypes.bool,
	  yearHeaderFormat: React.PropTypes.string
	};

	module.exports.defaults.Year = {
	  yearHeader: true,
	  yearHeaderFormat: 'YYYY'
	};

	module.exports.types.Month = {
	  monthNames: React.PropTypes.bool,
	  monthNameFormat: React.PropTypes.string,
	  weekdayNames: React.PropTypes.bool,
	  weekdayFormat: React.PropTypes.string
	};

	module.exports.defaults.Month = {
	  monthNames: true,
	  monthNameFormat: 'MMMM YYYY',
	  weekdayNames: true,
	  weekdayFormat: 'dd'
	};

	module.exports.types.Week = {
	  weekNumbers: React.PropTypes.bool,
	  weekNumberFormat: React.PropTypes.string
	};

	module.exports.defaults.Week = {
	  weekNumbers: false,
	  weekNumberFormat: 'w'
	};

	module.exports.types.Day = {
	  dayAgenda: React.PropTypes.bool,
	  dayHeader: React.PropTypes.bool,
	  dayHeaderFormat: React.PropTypes.string,
	  dayFormat: React.PropTypes.string
	};

	module.exports.defaults.Day = {
	  dayAgenda: false,
	  dayHeader: false,
	  dayHeaderFormat: 'MMM Do',
	  dayFormat: 'D'
	};

	var eventList = [
	  'onClick', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter',
	  'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop',
	  'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut',
	  'onMouseOver', 'onMouseUp', 'onTouchCancel', 'onTouchEnd', 'onTouchMove',
	  'onTouchStart'
	];

	['Day', 'Week', 'Month', 'Year'].forEach(function (item) {
	  eventList.forEach(function (event) {
	    module.exports.types[item][event] = React.PropTypes.func;
	  });
	});

	module.exports.Mixin = function (addContext ) {for (var types=[],$__0=1,$__1=arguments.length;$__0<$__1;$__0++) types.push(arguments[$__0]);
	  types.unshift('Generic');
	  var propTypes = {};
	  var defaultProps = {};

	  types.forEach(function(type)  {
	    _.assign(propTypes, module.exports.types[type]);
	    _.assign(defaultProps, module.exports.defaults[type]);
	  });

	  var result = {
	    propTypes: propTypes,
	    childContextTypes: propTypes
	  };

	  if (addContext) {
	    result.contextTypes = propTypes;
	  }

	  result.getPropOrCtx = function (val) {
	    if (this.props[val] !== undefined) {
	      return this.props[val];
	    } else if (this.context[val] !== undefined) {
	      return this.context[val];
	    } else {
	      return defaultProps[val];
	    }
	  };

	  result.getCalendarCtx = function () {
	    return _.pick(this.props, _.keys(propTypes));
	  };

	  result.getEventHandlers = function () {
	    return _.mapValues(_.pick(this.props, function(value, key)  {
	      return _.contains(eventList, key);
	    }), function(cb)  {
	      return cb.bind(
	        null,
	        this.constructor.displayName,
	        this.props.date.clone()
	      );
	    }.bind(this));
	  };

	  return result;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(6);
	var React = __webpack_require__(7);

	function nonEmptyString (str) {
	  return _.isString(str) && str.length > 0;
	}

	function getActiveClasses (classNames) {
	  return Object.keys(classNames).filter(function (className) {
	    return classNames[className];
	  });
	};

	var ClassNamer = function (options) {
	  var fn = function () {
	    return fn.toString();
	  };

	  fn.options = _.defaults(options, {
	    namespace: '',
	    parents: [],
	    className: '',
	    modifiers: {},
	    classes: {},
	    namespaceSeparator: '-',
	    descendantSeparator: '-',
	    modifierSeparator: '--'
	  });

	  fn.prototype = Object.create(Function.prototype);
	  _.mixin(fn, ClassNamer.prototype);

	  return fn;
	};

	ClassNamer.prototype.getBaseClass = function () {
	  if (!nonEmptyString(this.options.className)) {
	    return '';
	  };

	  var classNames = [];
	  if (nonEmptyString(this.options.namespace)) {
	    classNames.push(this.options.namespace);
	  }

	  if (this.options.parents.length > 0) {
	    classNames.push(this.options.parents[0]);
	    classNames = [classNames.join(this.options.namespaceSeparator)];
	    classNames = classNames.concat(this.options.parents.slice(1));
	  }

	  classNames.push(this.options.className);

	  return classNames.join(this.options.descendantSeparator);
	};

	ClassNamer.prototype.getModifierClasses = function () {
	  var baseClass = this.getBaseClass();
	  var modifiers = getActiveClasses(this.options.modifiers);

	  if (nonEmptyString(baseClass)) {
	    return modifiers.map(function(modifier)  {
	      return [baseClass, modifier].join(this.options.modifierSeparator);
	    }.bind(this));
	  } else {
	    return modifiers;
	  }
	};

	ClassNamer.prototype.getOtherClasses = function () {
	  return getActiveClasses(this.options.classes);
	};

	ClassNamer.prototype.getAllClasses = function () {
	  return Array.prototype.concat(
	    [this.getBaseClass()],
	    this.getModifierClasses(),
	    this.getOtherClasses()
	  );
	};

	ClassNamer.prototype.descendant = function (descendant, modifiers, classes) {
	  if (!_.isArray(descendant)) {
	    descendant = [descendant];
	  }
	  var options = _.assign({}, this.options, {
	    parents: Array.prototype.concat(
	      this.options.parents,
	      nonEmptyString(this.options.className) ? [this.options.className] : [],
	      descendant.slice(0, -1)
	    ),
	    className: descendant.slice(-1)[0],
	    modifiers: modifiers,
	    classes: classes
	  });

	  return new ClassNamer(options);
	};

	ClassNamer.prototype.descendants = function () {for (var descendants=[],$__0=0,$__1=arguments.length;$__0<$__1;$__0++) descendants.push(arguments[$__0]);
	  return this.descendant(descendants, {}, {});
	};

	ClassNamer.prototype.toString = function () {
	  return this.getAllClasses().join(' ');
	};

	var ClassNameMixin = {
	  propTypes: {
	    classNamespace: React.PropTypes.string,
	    className: React.PropTypes.oneOfType(
	      React.PropTypes.string,
	      React.PropTypes.arrayOf(React.PropTypes.string)
	    ),
	    classNameOptions: React.PropTypes.object
	  },

	  contextTypes: {
	    classNamespace: React.PropTypes.string,
	    classNameOptions: React.PropTypes.object
	  },

	  getNamespace: function () {
	    return this.getPropOrCtx('classNamespace');
	  },

	  getClassNameOptions: function () {
	    return this.getPropOrCtx('classNameOptions');
	  },

	  className: function (options) {
	    return new ClassNamer(_.assign({
	      namespace: this.getNamespace(),
	      className: this.props.className || this.constructor.displayName
	    }, this.getClassNameOptions(), options));
	  }
	};

	module.exports = ClassNameMixin;


/***/ }
/******/ ])
});
;