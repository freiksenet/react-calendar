import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { getClsMods, getModsByCompType } from './util';

const Day = (props) => {
  const clsPrefix = 'rc-Day';
  const { date, mods, outside } = props;

  let mod;
  let events = {};

  if (mods) {
    mod = mods.find((mod) => mod.date ? mod.date.isSame(date, 'day') : null);
  }

  const clsMods = getClsMods(clsPrefix, mod);

  mods.filter((mod) => !mod.date) // TODO: revisit this
    .forEach((mod) =>
      Object.keys(mod.events)
        .forEach((key) =>
          events[key] = mod.events[key].bind(null, date)
        )
      )

  const clsDay = classnames(clsPrefix, { 'rc-Day--outside': outside }, clsMods);

  return <div className={ clsDay } { ...events }>{ date.format(props.dayFormat) }</div>
};

Day.propTypes = {
  date: React.PropTypes.object.isRequired,
  dayAgenda: React.PropTypes.bool,
  dayHeader: React.PropTypes.bool,
  dayHeaderFormat: React.PropTypes.string,
  dayFormat: React.PropTypes.string,
  mods: PropTypes.array
};

Day.defaultProps = {
  dayAgenda: false,
  dayHeader: false,
  dayHeaderFormat: 'MMM Do',
  dayFormat: 'D'
};

export default Day;
