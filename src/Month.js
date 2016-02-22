import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { monthEdges, weeksOfMonth, daysOfWeek } from './dateUtils';
import { getClsMods, getModsByCompType } from './util';
import Week from './Week';
import Day from './Day2';

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
  const { date, day, mods, week, weekNumbers } = props;
  const edges = monthEdges(date);

  const monthMods = mods.find((mod) => mod.date ? mod.date.isSame(date, 'month', 'year') : false);
  const compEvents = mods.filter((mod) => !mod.date).events;

  let clsMods = getClsMods(clsPrefix, monthMods);

  return (
    <div className={ classnames(clsPrefix, clsMods) } { ...compEvents }>
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
