import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import { getModsByCompType } from './util';

import Month from './Month';

export default class Calendar extends PureComponent {
  static propTypes = {
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    weekNumbers: PropTypes.bool,
    locale: PropTypes.string,
    month: PropTypes.array,
    yearHeaderFormat: PropTypes.string,
    events: PropTypes.object,
  };

  static defaultProps = {
    locale: 'en',
    yearHeaderFormat: 'YYYY',
  };

  getMonthRange() {
    const focus = this.moment(this.props.startDate).startOf('month');
    const start = this.moment(this.props.startDate);
    const end = this.moment(this.props.endDate);
    const size = end.diff(start, 'month') + 1;

    return Array(size).fill(0).map((n, i) => focus.clone().add(n + i, 'months'));
  }

  moment(...args) {
    const localMoment = moment.apply(args);

    localMoment.locale(this.props.locale);

    return localMoment;
  }

  renderHeader() {
    return (
      <header key="header" className={classnames('rc-Calendar-header')}>
        {this.moment(this.props.startDate).format(this.props.yearHeaderFormat)}
      </header>
    );
  }


  render() {
    const { events } = this.props;

    return (
      <div>
        { this.renderHeader() }
        {
          this.getMonthRange().map((date, i) =>
            <Month
              key={`month-${i}`}
              date={date.toISOString()}
              weekNumbers={this.props.weekNumbers}
              events={events}
            />)
        }
      </div>
    );
  }
}
