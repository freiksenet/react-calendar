import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from './src/Calendar2'

require('./less/bootstrap-theme.less');

const PagingCalendar = React.createClass({
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
    alert('handleClick: ' + scope + ' ' + m.format());
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
        <Calendar firstMonth={ 1 }
                   date={ this.state.date }
                   weekNumbers={ true }
                   startDate={ this.state.date.clone().startOf('year') }
                   endDate={ this.state.date.clone().endOf('year') }
                   month={ [ { date: moment(), cls: ['current']  } ] }
                   day={ [
                     {
                       date: moment(),
                       cls: ['current']
                     }
                   ] } />
      </div>
    );
  }
});

ReactDOM.render(
  <PagingCalendar />,
  document.getElementById('app')
);
