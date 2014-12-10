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
    var compType = comp().type;
    if (!children) {
      children = [];
    }
    React.Children.forEach(this.props.children, (child) => {
      children.push(child);
    });

    var result = {
      thisGlobals: [],
      nextGlobals: []
    };
    var dateString = dateToComponentMap[compType.displayName];
    children.forEach((child) => {
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

    thisLevel.forEach((child) => {
      React.Children.forEach(child.props.children, (childChild) => {
        children.push(childChild);
      });
      var mergedProps = ['modifiers', 'classes'].reduce((merged, propKey) => {
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
