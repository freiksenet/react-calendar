"use strict";

var _ = require('lodash');
var React = require('react');
var moment = require('moment');

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

module.exports.Mixin = function (addContext, ...types) {
  types.unshift('Generic');
  var propTypes = {};
  var defaultProps = {};

  types.forEach((type) => {
    _.assign(propTypes, module.exports.types[type]);
    _.assign(defaultProps, module.exports.defaults[type]);
  });

  var result = {
    propTypes: propTypes
  };

  if (addContext) {
    result.contextTypes = propTypes;
  }

  result.getPropOrCtx = function (val) {
    if (this.props[val] !== undefined) {
      return this.props[val];
    } else if (this.context[val]) {
      return this.context[val];
    } else {
      return defaultProps[val];
    }
  };

  result.getCalendarCtx = function () {
    return _.pick(this.props, _.keys(propTypes));
  };
  return result;
};
