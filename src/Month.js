import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { monthEdges, weeksOfMonth, daysOfWeek } from './dateUtils';
import Week from './Week2';
import Day from './Day2';

const clsPrefix = 'rc-Month';

const renderWeekHeader = (props) => {
  return (
    <div className={`${clsPrefix}-weekdays`}>
      {
        daysOfWeek(props.date).map((weekday, i) =>
          <div key={ i } className={ classnames(`${clsPrefix}-weekdays-weekday`) }>
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
    <header key="header" className={ classnames('rc-Month-header') }>
      { props.date.format(props.monthNameFormat) }
    </header>
  );
}

const Month = (props) => {
  const edges = monthEdges(props.date);
  let clsMods;

  if (props.mods && props.mods.cls) {
    clsMods = props.mods.cls.map((cls) => `${clsPrefix}--${cls}`);
  }

  return (
    <div className={ classnames(clsPrefix, clsMods) }>
      { renderHeader(props) }
      { renderWeekHeader(props) }
      {
        weeksOfMonth(props.date).map((date, i) => {
          return (
            <Week key={ `week-${i}` } date={ date } edges={ edges } weekNumbers={ props.weekNumbers } mods={ props.week } day={ props.day } />
          );
        })
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
