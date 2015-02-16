/** @jsx React.DOM */
"use strict";

var _ = require('lodash');
var React = require('react');

var propTypes = require('./propTypes');
var ClassNameMixin = require('./ClassNameMixin');

var Day = React.createClass({
  mixins: [propTypes.Mixin(true,
    'Day'
  ), ClassNameMixin],

  makeHeader: function (classes) {
    if (this.getPropOrCtx('dayHeader')) {
      return (
        <header className={classes()}>
          {this.props.date.format(this.getPropOrCtx('dayHeaderFormat'))}
        </header>
      );
    } else {
      return null;
    }
  },

  makeBody: function (classes) {
    return (
      <span key="body"
            className={classes()}>
        {this.props.date.format(this.getPropOrCtx('dayFormat'))}
      </span>
    );
  },

  makeAgenda: function (classes) {
    if (this.getPropOrCtx('dayAgenda')) {
      return (
        <div key="agenda"
             className={classes()}>
          {this.props.children}
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

      var props = _.assign({
        className: classes()
      }, this.getEventHandlers());

      return React.DOM.div(props, [
        this.makeHeader(classes.descendant('header')),
        this.makeBody(classes.descendant('body')),
        this.makeAgenda(classes.descendant('agenda'))
      ]);
    });
  }
});

module.exports = Day;
