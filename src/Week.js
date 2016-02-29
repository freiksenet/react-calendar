import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { getMods } from './util';
import { daysOfWeek } from './dateUtils';
import Day from './Day';

const clsPrefix = 'rc-Week';

const makeWeekNumber = (props) => {
  if (!props.weekNumbers) {
    return null;
  }

  return (
    <div key="weekNumber"
         className={ classnames(`${clsPrefix}-number`) }>
      { props.date.format(props.weekNumberFormat) }
    </div>
  );
}

const Week = (props) => {
  const { mods, date } = props;
  const modifiers = getMods(mods, date, clsPrefix, 'week');

  let clsMods, events;

  if (modifiers) {
    clsMods = modifiers.clsMods;
    events = modifiers.events;
  }

  return (
    <div key="days" className={ classnames(clsPrefix, clsMods) } { ...events }>
      { makeWeekNumber(props) }
      <div className={ classnames(`${clsPrefix}-days`) }>
        {
          daysOfWeek(props.date).map((date, i) => {
            let outside;

            if (props.edges) {
              outside = Boolean(props.edges.find((edge, j) => edge.isSame(date, 'month', 'week', 'year')));
            }

            return <Day outside={ !!outside } key={ `day-${i}` } date={ date } mods={ props.day } />
          })
        }
      </div>
    </div>
  );
};

Week.propTypes = {
  weekNumbers: PropTypes.bool,
  weekNumberFormat: PropTypes.string
};

Week.defaultProps = {
  weekNumbers: false,
  weekNumberFormat: 'w'
};

export default Week;
