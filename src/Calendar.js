/** @jsx React.DOM */
"use strict";

var _ = require('lodash');
var React = require('react');
var moment = require('moment');

var CalendarBaseMixin = require('./CalendarBaseMixin');
var propTypes = require('./propTypes');
var ClassNameMixin = require('./ClassNameMixin');
var Month = require('./Month');

var Calendar = React.createClass({
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
        <header key="header"
                className={classes.descendant('header')}>
          {this.props.date.format(this.getPropOrCtx('yearHeaderFormat'))}
        </header>
      );
    } else {
      return null;
    }
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
    return _.range(left, right).map((offset) => {
      return focus.clone().add(offset, 'months');
    });
  },

  makeMonth: function (date) {
    var monthProps = {
      key: date.format(),
      date: date
    };
    var children = [];

    var monthChildren = this.children[date.format()];
    if (monthChildren) {
      children = monthChildren.others.slice();
      if (monthChildren.months) {
        monthChildren.months.forEach((child) => {
          React.Children.forEach(child.props.children, (childChild) => {
            children.push(childChild);
          });
          monthProps = _.assign({}, child.props, monthProps);
        });
      }
    }

    return Month(monthProps, children);
  },

  render: function () {
    return React.withContext(this.getCalendarCtx(), () => {
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
    });
  }
});

module.exports = Calendar;
