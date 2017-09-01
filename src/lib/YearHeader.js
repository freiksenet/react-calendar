import React from 'react';
import classnames from 'classnames';

class YearHeader extends React.PureComponent {
  render () {
    return (
      <header key="header" className={classnames('rc-Calendar-header')}>
        {this.props.year}
      </header>
    );
  }
}

export default YearHeader;
