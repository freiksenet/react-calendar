/** @jsx React.DOM */
"use strict";

var _ = require('lodash');
var React = require('react');
var moment = require('moment');

var CalendarBaseMixin = require('./CalendarBaseMixin');
var propTypes = require('./propTypes');
var ClassNameMixin = require('./ClassNameMixin');
var Month = React.createFactory(require('./Month'));

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
        return _.range(left, right).map(function (offset) {
            return focus.clone().add(offset, 'months');
        });
    },

    render: function () {

        var classes = this.className({
            modifiers: this.context.modifiers,
            classes: this.context.classes
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

var CalendarWrapper = React.createClass({

    mixins: [
        CalendarBaseMixin,
        propTypes.Mixin(false,
            'Calendar',
            'Year',
            'Month',
            'Week',
            'Day'
        ),
        propTypes.ChildContext( [
            'Generic',
            'Calendar',
            'Year',
            'Month',
            'Week',
            'Day'
        ]),
        ClassNameMixin
    ],

    getChildContext: function () {
        var ctx = this.getCalendarCtx();
        return ctx;
    },

// Attention contextTypes défini dans le mixin est accessible via context
    render: function () {

        //console.log('context type %o VS context %o VS %o', this.context, this.getCalendarCtx(), this.childContextTypes);
        return <Calendar {...this.props}/>;
    }
});


module.exports = CalendarWrapper;
