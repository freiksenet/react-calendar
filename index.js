/** @jsx React.DOM */
"use strict";

var moment = require('moment');
var React = require('react');
var Calendar = require('./react-calendar');

React.renderComponent((
  <div>
    <h1>react-calendar examples</h1>
    <Calendar firstMonth={1}
              date={moment()}
              weekNumbers={true} />
  </div>
  ), document.getElementById('app')
);
