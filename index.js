/** @jsx React.DOM */
"use strict";

var moment = require('moment');
var React = require('react');
var {Calendar, Month, Week, Day} = require('./react-calendar');

require('./less/bootstrap-theme.less');

React.renderComponent((
  <div>
    <Calendar firstMonth={1}
              date={moment("2014-01-01")}
              weekNumbers={true}
              size={12}>
      <Month date={moment()}
             modifiers={{current: true}}/>
      <Day date={moment()}
           modifiers={{current: true}} />
    </Calendar>
  </div>
  ), document.getElementById('app')
);
