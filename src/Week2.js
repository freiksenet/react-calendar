import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { daysOfWeek } from './dateUtils';
import Day from './Day2'

const clsPrefix = 'rc-Week'

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
  let clsMods;

  if (props.mods && props.mods.cls) {
    clsMods = props.mods.cls.map((cls) => `${clsPrefix}--${cls}`);
  }

  return (
    <div key="days" className={ classnames(clsPrefix, clsMods) }>
      { makeWeekNumber(props) }
      <div className={ classnames(`${clsPrefix}-days`) }>
        {
          daysOfWeek(props.date).map((date, i) => {
            const outside = Boolean(props.edges.find((edge, j) => edge.isSame(date, 'month', 'week', 'year')));

            return <Day outside={ outside } key={`day-${i}`} date={ date } mods={ props.day } />
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
