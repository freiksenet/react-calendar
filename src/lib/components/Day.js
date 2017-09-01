import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Day extends PureComponent {
  static propTypes = {
    day: PropTypes.string,
  }

  render () {
    const { className, day } = this.props;

    return (
      <div className={className}>{day}</div>
    );
  }
}

export default Day;
