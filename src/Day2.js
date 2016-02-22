import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { getMods } from './util';

const Day = (props) => {
  const clsPrefix = 'rc-Day';
  const { date, mods, outside } = props;
  const { clsMods, events } = getMods(mods, date, clsPrefix, 'day');
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
