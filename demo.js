import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from './src/Calendar';
import Week from './src/Week';
import Month from './src/Month';

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

  render: function () {
    return (
      <div>
        <a href="#" className="prevYear" onClick={this.handlePrevYear}>
          Prev Year
        </a>
        <a href="#" className="nextYear" onClick={this.handleNextYear}>
          Next Year
        </a>
        <Calendar weekNumbers={ true }
                  startDate={ this.state.date }
                  date={ this.state.date }
                  endDate={ this.state.date.clone().endOf('year') }
                  mods={
                  [
                    {
                      date: moment(),
                      classNames: [ 'current' ],
                      component: [ 'day', 'month', 'week' ]
                    },
                    {
                      startDate: moment().add(3, 'days'),
                      endDate: moment().add(7, 'days'),
                      classNames: [ 'longEvent' ],
                      component: [ 'day' ]
                    },
                    {
                      date: moment().add(3, 'days'),
                      classNames: [ 'appointment' ],
                      component: [ 'day' ]
                    },
                    {
                      date: moment().add(4, 'days'),
                      classNames: [ 'event', 'warning' ],
                      component: [ 'day' ],
                      events: {
                        onClick: (date, e) => alert(`${date.format('dddd')}'s event!`)
                      }
                    },
                    {
                      date: moment().add(5, 'days'),
                      classNames: [ 'event' ],
                      component: [ 'day' ]
                    },
                    {
                      component: 'day',
                      events: {
                        onClick: (date, e) => alert(date.format())
                      }
                    }
                  ]
                } />
      </div>
    );
  }
});

ReactDOM.render(
  <PagingCalendar />,
  document.getElementById('app')
);
