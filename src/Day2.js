import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Day2 = (props) => {
  const clsPrefix = 'rc-Day';
  const { date, mods, outside } = props;
  const handleClick = (props) => alert(props.date.format('w'));
  const mod = mods.find((mod) => mod.date.isSame(date, 'day'));

  let clsMods;

  if (mod && mod.cls) {
    clsMods = mod.cls.map((cls) => `${clsPrefix}--${cls}`);
  }

  const cls = classnames(clsPrefix, { 'rc-Day--outside': outside }, clsMods);

  return <div className={cls} onClick={ handleClick.bind(null, props) }>{ date.format('D') }</div>
};

Day2.propTypes = {
  date: React.PropTypes.object.isRequired,
  dayAgenda: React.PropTypes.bool,
  dayHeader: React.PropTypes.bool,
  dayHeaderFormat: React.PropTypes.string,
  dayFormat: React.PropTypes.string,
  mods: PropTypes.array
};

Day2.defaultProps = {
  dayAgenda: false,
  dayHeader: false,
  dayHeaderFormat: 'MMM Do',
  dayFormat: 'D'
};
export default Day2;
