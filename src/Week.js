import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { getMods } from './util';
import { daysOfWeek } from './dateUtils';
import Day from './Day2';

const clsPrefix = 'rc-Week';

const makeWeekNumber = (props) => {
  if (!props.weekNumbers) {
    return null;
  }

  return (
    <div key="weekNumber"
         className={ classnames('rc-Week-number') }>
      { props.date.format(props.weekNumberFormat) }
    </div>
  );
}

const Week = (props) => {
  const { mods, date } = props;
  const { clsMods, events } = getMods(mods, date, clsPrefix, 'week');

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

            return <Day outside={ !!outside } key={`day-${i}`} date={ date } mods={ props.day } />
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
