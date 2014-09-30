/** @jsx React.DOM */
"use strict";

var React = require('react');

var propTypes = require('./propTypes');
var ClassNameMixin = require('./ClassNameMixin');
var Day = require('./Day');

var Week = React.createClass({
  mixins: [propTypes.Mixin(true,
    'Week',
    'Day'
  ), ClassNameMixin],

  makeWeekNumber: function (classes) {
    if (this.getPropOrCtx('weekNumbers')) {
      return (
        <div key={"weekNumber-" + this.props.date.week()}
             className={classes.descendant('number')()}>
          {this.props.date.format(this.getPropOrCtx('weekNumberFormat'))}
        </div>
      );
    } else {
      return null;
    }
  },

  getDayRange: function () {
    return _.range(0, 7).map((day) => {
      return this.props.date.clone().add(day, 'day');
    });
  },

  makeDay: function (day) {
    return (
      <Day key={day.format()}
           date={day} />
    );
  },

  render: function () {
    return React.withContext(this.getCalendarCtx(), () => {
      var classes = this.className({
        modifiers: this.props.modifiers,
        classes: this.props.classes
      });

      var days = this.getDayRange().map(
        this.makeDay
      );

      return (
        <div className={classes()}>
          {this.makeWeekNumber(classes)}
          <div className={classes.descendant('days')}>
            {days}
          </div>
        </div>
      );
    });
  }
});

module.exports = Week;
