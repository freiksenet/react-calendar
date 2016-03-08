import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { monthEdges, weeksOfMonth, daysOfWeek } from './dateUtils';
import { getMods, getModsByCompType } from './util';
import Week from './Week';
import Day from './Day';

const clsPrefix = 'rc-Month';

const renderWeekHeader = (props) => {
  return (
    <div className={`${clsPrefix}-weekdays`}>
      {
        daysOfWeek(props.date).map((weekday, i) =>
          <div key={ `weekday-header-${i}` } className={ classnames(`${clsPrefix}-weekdays-weekday`) }>
            { weekday.format(props.weekdayFormat) }
          </div>
        )
      }
    </div>
  );
};

const renderHeader = (props) => {
  if (!props.monthNames) {
    return null;
  }

  return (
    <header key="header" className={ classnames(`${clsPrefix}-header`) }>
      { props.date.format(props.monthNameFormat) }
    </header>
  );
}

const Month = (props) => {
  const { date, mods, weekNumbers } = props;
  const modifiers = getMods(mods, date, clsPrefix, 'month');
  const edges = monthEdges(date);

  let { day, week } = props;

  if (!props.day) {
    day = getModsByCompType('day', mods);
  }

  if (!props.week) {
    week = getModsByCompType('week', mods);
  }

  let clsMods, events;

  if (modifiers) {
    clsMods = modifiers.clsMods;
    events = modifiers.events;
  }

  return (
    <div className={ classnames(clsPrefix, clsMods) } { ...events }>
      { renderHeader(props) }
      { renderWeekHeader(props) }
      {
        weeksOfMonth(props.date).map((wDate, i) =>
          <Week key={ `week-${i}` }
                date={ wDate }
                edges={ edges }
                weekNumbers={ weekNumbers }
                mods={ week }
                day={ day } />
        )
      }
    </div>
  );
};

Month.propTypes = {
  monthNames: PropTypes.bool,
  monthNameFormat: PropTypes.string,
  weekdayNames: PropTypes.bool,
  weekdayFormat: PropTypes.string,
  mod: PropTypes.object
};

Month.defaultProps = {
  monthNames: true,
  monthNameFormat: 'MMMM YYYY',
  weekdayNames: true,
  weekdayFormat: 'dd'
};

export default Month;
