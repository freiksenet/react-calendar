import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { getMods, getModsByCompType } from './util';
import { daysOfWeek } from './dateUtils';
import Day from './Day';

const clsPrefix = 'rc-Week';

const makeWeekNumber = (props) => {
  if (!props.weekNumbers) {
    return null;
  }

  return (
    <div key="weekNumber" className={ classnames(`${clsPrefix}-number`) }>
      { props.date.format(props.weekNumberFormat) }
    </div>
  );
};

const renderWeekHeader = (props) => {
  if (!props.weekHeader) {
    return null;
  }

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

const Week = (props) => {
  const { mods, date } = props;
  let clsMods, events, week, { day } = props;

  week = getModsByCompType('week', mods);
  const modifiers = getMods(week, date, clsPrefix, 'week');

  if (modifiers) {
    clsMods = modifiers.clsMods;
    events = modifiers.events;
  }

  if (!props.day) {
    day = getModsByCompType('day', mods);
  }

  return (
    <div key="days" className={ classnames(clsPrefix, clsMods) } { ...events }>
      { renderWeekHeader(props) }
      { makeWeekNumber(props) }
      <div className={ classnames(`${clsPrefix}-days`) }>
        {
          daysOfWeek(props.date).map((date, i) => {
            let outside;

            if (props.edges) {
              outside = Boolean(props.edges.find((edge, j) => edge.isSame(date, 'month', 'week', 'year')));
            }

            return <Day outside={ !!outside } key={ `day-${i}` } date={ date } mods={ day } />
          })
        }
      </div>
    </div>
  );
};

Week.propTypes = {
  weekHeader: PropTypes.bool,
  weekNumbers: PropTypes.bool,
  weekNumberFormat: PropTypes.string,
  weekdayFormat: PropTypes.string,
};

Week.defaultProps = {
  weekHeader: false,
  weekNumbers: false,
  weekNumberFormat: 'w',
  weekdayFormat: 'dd',
};

export default Week;
