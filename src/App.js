import React, { Component } from 'react';
import startOfYear from 'date-fns/start_of_year';
import endOfYear from 'date-fns/end_of_year';
import subYears from 'date-fns/sub_years'
import addYears from 'date-fns/add_years'

import YearCalendar from './lib/YearCalendar';

import logo from './logo.svg';
import './bootstrap-theme.less';
import './App.css';

// const startOfYear = moment().startOf('year');
//
// const yearOfEvents = Array(365).fill(0).map(() => ({
//   date: startOfYear.add(1, 'day').clone(),
//   classNames: ['event'],
// }));

const normalize = (events) => {
  const normalizedEvents = {};
  events.forEach(({ date, classNames }) => {
    normalizedEvents[date.clone().unix()] = { classNames };
  });

  return normalizedEvents;
};

class App extends Component {
  constructor(props) {
    super(props);

    // this.events = normalize(yearOfEvents);

    this.state = {
      date: startOfYear(new Date()),
    };
  }

  handlePrevYear = (e) => {
    e.preventDefault();

    this.setState({ date: subYears(this.state.date, 1) });
  }

  handleNextYear = (e) => {
    e.preventDefault();

    this.setState({ date: addYears(this.state.date, 1) });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Calendar</h2>
        </div>
        <button className="btn prevYear pull-left" onClick={this.handlePrevYear}>
          Prev Year
        </button>
        <button className="btn nextYear pull-right" onClick={this.handleNextYear}>
          Next Year
        </button>
        <div className="container-fluid">
          <div id="app">
            <YearCalendar
              weekNumbers={false}
              startDate={this.state.date}
              focus={this.state.date}
              endDate={endOfYear(this.state.date)}
              events={this.events}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
