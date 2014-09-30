/** @jsx React.DOM */
"use strict";

var moment = require('moment');
var React = require('react');
var {Calendar, Month, Week} = require('./react-calendar');

React.renderComponent((
  <div>
    <Calendar firstMonth={1}
              date={moment()}
              weekNumbers={true} />
  </div>
  ), document.getElementById('app')
);
