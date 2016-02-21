import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames'

import Month from './Month2';

export default class Calendar extends Component {
  static propTypes = {
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    firstMonth: PropTypes.number.isRequired,
    weekNumbers: PropTypes.bool,
    locale: PropTypes.string,
    month: PropTypes.array
  };

  constructor (props, context) {
    super(props, context);
  }

  moment () {
    const localMoment = moment.apply(null, arguments);

    localMoment.locale(this.props.locale || 'en');

    return localMoment;
  }

  renderHeader () {
    return (
      <header key="header"
              className={classnames('rc-Calendar-header')}>
        { this.moment(this.props.date).format(this.props.yearHeaderFormat || 'YYYY') }
      </header>
    );
  }

  getMonthRange () {
    const focus = this.moment(this.props.date).startOf('month');

    const start = this.moment(this.props.startDate);
    const end = this.moment(this.props.endDate);
    const size = end.diff(start, 'month') + 1;

    return Array(size).fill(0).map((n, i) => {
      return focus.clone().add(n + i, 'months');
    });
  }

  render () {
    const monthMods = this.props.month;
    const dayMods = this.props.day;
    const weekMods = this.props.week;

    return (
      <div>
        { this.renderHeader() }
        {
          this.getMonthRange().map((date, i) => {
            const mods = monthMods.find((mod) => mod.date.isSame(date, 'month', 'year'));

            return <Month key={ `month-${i}` }
                          date={ date }
                          weekNumbers={true}
                          mods={ mods }
                          week={ weekMods }
                          day={ dayMods } />
          })
        }
      </div>
    )
  }
}
