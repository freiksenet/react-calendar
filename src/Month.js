/** @jsx React.DOM */
"use strict";

var _ = require('lodash');
var React = require('react');

var propTypes = require('./propTypes');
var ClassNameMixin = require('./ClassNameMixin');
var Week = require('./Week');

var Month = React.createClass({
  mixins: [propTypes.Mixin(true,
    'Month',
    'Week',
    'Day'
  ), ClassNameMixin],

  makeHeader: function (classes) {
    if (this.getPropOrCtx('monthNames')) {
      return (
        <header key="header"
                className={classes()}>
          {this.props.date.format(this.getPropOrCtx('monthNameFormat'))}
        </header>
      );
    } else {
      return null;
    }
  },

  makeWeekHeader: function (classes) {
    if (this.getPropOrCtx('weekdayNames')) {
      var weekStart = this.props.date.clone().startOf('week');
      var week = [];
      for (var offset = 0; offset < 7; offset++) {
        weekStart.add(offset, 'day');
        week.push(weekStart.format(this.getPropOrCtx('weekdayFormat')));
      }
      var weekEls = week.map(function (w, i) {
        return (
          <div key={i}
               className={classes.descendant('weekday')()}>
            {w}
          </div>
        );
      });
      return (
        <header key="weekdays"
                className={classes()}>
          {weekEls}
        </header>
      );
    } else {
      return null;
    }
  },

  getWeekRange: function () {
    var firstDay = this.props.date.clone().startOf('month');
    var lastDay = this.props.date.clone().endOf('month');
    return _.range(firstDay.week(), lastDay.week()).map((week) => {
      return [week, this.props.date.clone().week(week).startOf('week')];
    });
  },

  makeWeek: function ([week, start]) {
    return (
      <Week key={week}
            date={start} />
    );
  },

  render: function () {
    return React.withContext(this.getCalendarCtx(), () => {
      var classes = this.className({
        modifiers: this.props.modifiers,
        classes: this.props.classes
      });

      var weeks = this.getWeekRange().map(this.makeWeek);

      return (
        <div className={classes()}>
          {this.makeHeader(classes.descendant('header'))}
          {this.makeWeekHeader(classes.descendant('weekdays'))}
          {weeks}
        </div>
      );
    });
  }
});

module.exports = Month;
