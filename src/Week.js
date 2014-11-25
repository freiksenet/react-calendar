/** @jsx React.DOM */
"use strict";

var _ = require('lodash');
var React = require('react');

var dateUtils = require('./dateUtils');
var CalendarBaseMixin = require('./CalendarBaseMixin');
var propTypes = require('./propTypes');
var ClassNameMixin = require('./ClassNameMixin');
var Day = React.createFactory(require('./Day'));

var Week = React.createClass({
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
        <div key="weekNumber"
             className={classes.descendant('number')()}>
          {this.props.date.format(this.getPropOrCtx('weekNumberFormat'))}
        </div>
      );
    } else {
      return null;
    }
  },

  render: function () {
    return React.withContext(this.getCalendarCtx(), () => {
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
        <div key="days" className={classes.descendant('days')}>
          {days}
        </div>
      ]);
    });
  }
});

module.exports = Week;
