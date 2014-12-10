/** @jsx React.DOM */
"use strict";

var moment = require('moment');
var React = require('react');
var {Calendar, Month, Week, Day} = require('./react-calendar');

require('./less/bootstrap-theme.less');

var PagingCalendar = React.createClass({
  getInitialState: function () {
    return {
      date: moment().startOf('year')
    };
  },

  handlePrevYear: function (e) {
    e.preventDefault();
    this.setState({
      date: this.state.date.clone().subtract(1, 'year')
    });
  },

  handleNextYear: function (e) {
    e.preventDefault();
    this.setState({
      date: this.state.date.clone().add(1, 'year')
    });
  },

  handleClick: function (scope, m, e) {
    alert("handleClick: " + scope + " " + m.format());
  },

  render: function () {
    return (
      <div>
        <a href="#" className="prevYear" onClick={this.handlePrevYear}>
          Prev Year
        </a>
        <a href="#" className="nextYear" onClick={this.handleNextYear}>
          Next Year
        </a>
        <Calendar firstMonth={1}
                  date={this.state.date}
                  weekNumbers={true}
                  size={12}>
          <Day onClick={this.handleClick} />
          <Month date={moment()}
                 modifiers={{current: true}}
                 onClick={this.handleClick} />
          <Day date={moment()}
               modifiers={{current: true}} />
        </Calendar>
      </div>
    );
  }
});

React.render(
  <PagingCalendar />,
  document.getElementById('app')
);
