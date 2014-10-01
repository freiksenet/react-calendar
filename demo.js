/** @jsx React.DOM */
"use strict";

var moment = require('moment');
var React = require('react');
var {Calendar, Month, Week, Day} = require('./react-calendar');

require('./less/bootstrap-theme.less');

function handleClick (scope, m, e) {
  alert("handleClick: " + scope + " " + m.format());
};

React.renderComponent(
  <div>
    <Calendar firstMonth={1}
              date={moment("2014-01-01")}
              weekNumbers={true}
              size={12}>
      <Month date={moment()}
             modifiers={{current: true}}
             onClick={handleClick} />
      <Day onClick={handleClick} />
      <Day date={moment()}
           modifiers={{current: true}} />
    </Calendar>
  </div>,
  document.getElementById('app')
);
