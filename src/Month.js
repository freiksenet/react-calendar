"use strict";

var _ = require('lodash');
var React = require('react');

var dateUtils = require('./dateUtils');
var CalendarBaseMixin = require('./CalendarBaseMixin');
var propTypes = require('./propTypes');
var ClassNameMixin = require('./ClassNameMixin');
var Week = React.createFactory(require('./Week'));
var Day = React.createFactory(require('./Day'));

var Month = React.createClass({
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
      var week = dateUtils.daysOfWeek(this.props.date);
      var weekEls = week.map((w, i) => {
        return (
          <div key={i}
               className={classes.descendant('weekday')()}>
            {w.format(this.getPropOrCtx('weekdayFormat'))}
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

  getChildContext(){
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
