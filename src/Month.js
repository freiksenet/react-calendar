import React, { PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';

const clsPrefix = 'rc-Month';

const renderWeekHeader = (props) => {
  const week = moment(props.date).clone().startOf('week');
  const weekDays = [];

  for (let i = 0; i < 7; i++) {
    week.add(i === 0 ? 0 : 1, 'day');

    weekDays.push(
      <div key={`weekday-header-${i}`} className={classnames(`${clsPrefix}-weekdays-weekday`)}>
        {week.format(props.weekdayFormat)}
      </div>
    );
  }

  return (
    <div className={`${clsPrefix}-weekdays`}>
      {weekDays}
    </div>
  );
};

const renderHeader = (props) => {
  if (props.renderHeader) {
    return props.renderHeader(props);
  }

  if (!props.monthNames) {
    return null;
  }

  return (
    <header key="header" className={classnames(`${clsPrefix}-header`)}>
      {moment(props.date).format(props.monthNameFormat)}
    </header>
  );
};

/** Returns moment objects for each day of the week.
 *  TODO: Ordering is locale aware.
 *  @param {string|Date|moment} week any date in a week to create days for
 */
function daysOfWeek(week, startMonth, events) {
  const days = [];
  const thisWeek = moment(week);

  for (let i = 0; i < 7; i++) {
    const day = thisWeek.clone().add(i, 'day');
    let clsDay = `rc-Day ${day.month() !== startMonth ? 'rc-Day--outside ' : ''}`;
    let event = [];

    if (events && events.hasOwnProperty(day.unix())) {
      event = events[day.unix()];
      clsDay = clsDay.concat(event.classNames.join(' '));
    }

    days.push(
      <div className={clsDay} key={`day-${day.format('MMMD')}`}>
        {day.format('D')}
      </div>
    );
  }

  return days;
}

/** Returns moment objects for first day of each week of the month.
 *  Can return moments from previous month if week start is in them.
 *  @param {string|Date|moment} month any date in a month to create weeks for
 */
export function weeksOfMonth(month, events) {
  const thisMonth = month.month();
  const weeks = [];

  weeks.push(daysOfWeek(month.clone().startOf('month').startOf('week'), thisMonth, events));

  do {
    month.add(1, 'week');
    weeks.push(daysOfWeek(month.clone().startOf('week'), thisMonth, events));
  } while (month.month() === thisMonth);

  return weeks;
}

const Month = (props) => {
  const { date, weekNumbers } = props;

  return (
    <div className={classnames(clsPrefix)}>
      {renderHeader(props)}
      {renderWeekHeader(props)}
      <div className="rc-Month dayContainer">
        {weeksOfMonth(moment(date), props.events)}
      </div>
    </div>
  );
};

Month.propTypes = {
  date: PropTypes.string.isRequired,
  weekNumbers: PropTypes.bool.isRequired,
  monthNames: PropTypes.bool,
  monthNameFormat: PropTypes.string,
  weekdayNames: PropTypes.bool,
  weekdayFormat: PropTypes.string,
  events: PropTypes.object,
};

Month.defaultProps = {
  monthNames: true,
  monthNameFormat: 'MMMM YYYY',
  weekdayNames: true,
  weekdayFormat: 'dd',
};

export default Month;
