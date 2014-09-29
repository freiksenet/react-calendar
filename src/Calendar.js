/** @jsx React.DOM */
"use strict";

var _ = require('lodash');
var React = require('react');
var moment = require('moment');

var propTypes = require('./propTypes');
var ClassNameMixin = require('./ClassNameMixin');
var Month = require('./Month');

var Calendar = React.createClass({
  mixins: [propTypes.Mixin(false,
    'Calendar',
    'Month',
    'Week',
    'Day'
  ), ClassNameMixin],

  getInitialState: function () {
    return {
      date: this.moment(this.props.date)
    };
  },

  makeHeader: function (classes) {
    return (
      <header key="header"
              className={classes.descendant('header')}>
        Header
      </header>
    );
  },

  getMonthRange: function () {
    var range, left, right;
    var focus = this.state.date.clone().date(1);
    var size = this.getPropOrCtx('size');
    var firstMonth = this.getPropOrCtx('firstMonth');

    if (_.isNumber(firstMonth) && size === 12) {
      var focusMonth = focus.month();
      if (focusMonth < firstMonth) {
        left = focusMonth + (12 - firstMonth);
      } else {
        left = focusMonth - firstMonth;
      }
      left = -(left + 1);
      right = size + left;
    } else if (firstMonth === 'current') {
      left = 0;
      right = size;
    } else {
      var half = size / 2;
      left = -Math.floor(half);
      right = Math.ceil(half);
    }
    return _.range(left, right).map((offset) => {
      return focus.clone().add(offset, 'months');
    });
  },

  makeMonth: function (date) {
    return (
      <Month key={date.format()}
             date={date} />
    );
  },

  render: function () {
    return React.withContext(this.getCalendarCtx(), () => {
      var classes = this.className({
        modifiers: this.props.modifiers,
        classes: this.props.classes
      });
      var months = this.getMonthRange().map(this.makeMonth);
      return (
        <div className={classes()}>
          {this.makeHeader(classes)}
          {months}
        </div>
      );
    });
  }
});

module.exports = Calendar;
