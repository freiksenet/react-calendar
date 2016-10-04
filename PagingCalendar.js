/* global moment */
import React, { Component, PropTypes } from 'react';
import Calendar from './src/Calendar';

const startOfYear = moment().startOf('year');

const yearOfEvents = Array(365).fill(0).map(() => ({
  date: startOfYear.add(1, 'day').clone(),
  classNames: ['event'],
}));

const normalize = (events) => {
  const normalizedEvents = {};
  events.forEach(({ date, classNames }) => {
    normalizedEvents[date.clone().unix()] = { classNames };
  });

  return normalizedEvents;
};

export default class PagingCalendar extends Component {
  constructor(props) {
    super(props);

    this.events = normalize(yearOfEvents);

    this.state = {
      date: moment().startOf('year'),
    };
  }

  handlePrevYear = (e) => {
    e.preventDefault();
    this.setState({ date: this.state.date.clone().subtract(1, 'year') });
  }

  handleNextYear = (e) => {
    e.preventDefault();

    this.setState({ date: this.state.date.clone().add(1, 'year') });
  }

  render() {
    return (
      <div>
        <button className="prevYear" onClick={this.handlePrevYear}>
          Prev Year
        </button>
        <button className="nextYear" onClick={this.handleNextYear}>
          Next Year
        </button>
        <Calendar
          weekNumbers={false}
          startDate={this.state.date}
          focus={this.state.date}
          endDate={this.state.date.clone().endOf('year')}
          events={this.events}
        />
      </div>
    );
  }
}
