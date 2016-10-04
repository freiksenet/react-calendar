import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from './src/Calendar';
import Month from './src/Month';
import PagingCalendar from './PagingCalendar';

import { AppContainer } from 'react-hot-loader';


// import { whyDidYouUpdate } from 'why-did-you-update';
//
// if (process.env.NODE_ENV !== 'production') {
//   whyDidYouUpdate(React);
// }

require('./less/bootstrap-theme.less');

ReactDOM.render(
  <AppContainer>
    <PagingCalendar />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./PagingCalendar', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextCal = require('./PagingCalendar').default;

    ReactDOM.render(
      <AppContainer>
        <NextCal />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
