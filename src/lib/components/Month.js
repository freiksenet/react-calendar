import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import differenceInDays from 'date-fns/difference_in_days';
import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import addDays from 'date-fns/add_days';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

import cx from 'classnames';

// Takes a date and returns the full 'block' month
function renderBlockMonth(date, dayFormat) {
  const endOfMonthEndOfWeek = endOfWeek(endOfMonth(date));
  const startOfMonthStartOfWeek = startOfWeek(startOfMonth(date));
  const daysInMonthWithFirstAndLastWeek =
    differenceInDays(endOfMonthEndOfWeek, startOfMonthStartOfWeek);

  const blockMonth = [];

  for (let i = 0; i < daysInMonthWithFirstAndLastWeek; i++) {
    const day = addDays(startOfMonthStartOfWeek, i);
    const dayKey = format(day, 'MM-D');
    const clsDay = cx('rc-Day', {
      'rc-Day--outside': isBefore(day, startOfMonth(date)) ||
        isAfter(day, endOfMonth(date)),
    });

    blockMonth.push(
      <div
        className={clsDay}
        key={`day-${dayKey}`}>
        {format(addDays(startOfMonthStartOfWeek, i), [dayFormat])}
      </div>
    );
  }

  return blockMonth;
}

function geFormattedWeekDays(weekDayFormat) {
  const weekDays = [];
  const weekStart = startOfWeek(startOfMonth(new Date()));

  for (let i = 0; i < 7; i++) {
    weekDays.push(format(addDays(weekStart, i), weekDayFormat));
  }

  return weekDays;
}
/**
 *  Could do this once in `YearCalendar.js`
 *  But what if you want to use Month Component?
 *  What if rendering months isn't the right approach for a year calendar?
 *  Could you render a bunch of <Day /> components?
 *  How would you break in between months?
 */
class Month extends PureComponent {
  constructor(props) {
    super(props);

    this.weekDays = geFormattedWeekDays(props.weekDayFormat);
  }

  static propTypes = {
    date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    dayFormat: PropTypes.string,
    monthNameFormat: PropTypes.string,
    weekDayFormat: PropTypes.string,
  }

  static defaultProps = {
    date: new Date(),
    dayFormat: 'D',
    monthNameFormat: 'MMMM',
    weekDayFormat: 'dd',
  }

  render () {
    const { date, dayFormat, monthNameFormat } = this.props;
    const monthHeader = format(date, monthNameFormat);
    const blockMonth = renderBlockMonth(parse(date), dayFormat);

    return (
      <div className="rc-Month">
        <div className="rc-Month-header">
          {monthHeader}
        </div>
        {this.weekDays}
        <div className="rc-Month dayContainer">
          {blockMonth}
        </div>
      </div>
    );
  }
}

export default Month;
