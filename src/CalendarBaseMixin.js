"use strict";

var _ = require('lodash');
var React = require('react');
var moment = require('moment');

var dateToComponentMap = {
  Month: 'YYYY-MM',
  Week: 'YYYY-ww',
  Day: 'YYYY-DDDD'
};

var CalendarBaseMixin = {
  moment: function (...args) {
    var localMoment = moment.apply(this, args);
    localMoment.locale(this.getPropOrCtx('locale'));
    return localMoment;
  },

  splitChildrenByDate: function (comp, children) {
    if (!children) {
      children = [];
    }
    React.Children.forEach(this.props.children, (child) => {
      children.push(child);
    });

    var result = {};
    var dateString = dateToComponentMap[comp.displayName];
    children.forEach((child) => {
      if (child.props.date) {
        var childDate = child.props.date.format(dateString);
        var existing = result[childDate] || {
          thisLevel: [],
          nextLevels: []
        };
        if (child instanceof comp) {
          existing.thisLevel.push(child);
        } else {
          existing.nextLevels.push(child);
        };
        result[childDate] = existing;
      }
    });

    return result;
  },

  makeDirectChild: function (childrenMap, comp, date) {
    var props = {
      key: date.format(),
      date: date
    };
    var children = [];

    var thisChildren = childrenMap[
      date.format(dateToComponentMap[comp.displayName])
    ];

    if (thisChildren) {
      children = thisChildren.nextLevels.slice();
      if (thisChildren.thisLevel) {
        thisChildren.thisLevel.forEach((child) => {
          React.Children.forEach(child.props.children, (childChild) => {
            children.push(childChild);
          });
          props = _.assign({}, child.props, props);
        });
      }
    }

    return comp(props, children);

  }
};

module.exports = CalendarBaseMixin;
