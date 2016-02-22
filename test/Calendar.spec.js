import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import moment from 'moment';
import Calendar from '../src/Calendar';

describe('<Calendar />', () => {
  let wrapper;
  before(() => {
    const date = moment().startOf('year');

    wrapper = shallow(<Calendar date={ date }
               weekNumbers={ true }
               startDate={ date }
               endDate={ date.clone().endOf('year') }
               mods={
                 [
                   {
                     date: moment(),
                     classNames: [ 'current' ],
                     component: [ 'day', 'month', 'week' ]
                   },
                   {
                     date: moment().add(3, 'days'),
                     classNames: [ 'event' ],
                     component: [ 'day' ]
                   },
                   {
                     date: moment().add(4, 'days'),
                     classNames: [ 'event', 'warning' ],
                     component: [ 'day' ],
                     events: {
                       onClick: (date, e) => alert(`${date.format('dddd')}'s event!`)
                     }
                   },
                   {
                     date: moment().add(5, 'days'),
                     classNames: [ 'event' ],
                     component: [ 'day' ]
                   },
                   {
                     component: 'day',
                     events: {
                       onClick: (date, e) => alert(date.format())
                     }
                   }
                 ]
               } />);
  });

  it('should render a year', () => {
    expect(wrapper.find('Month')).to.have.length(12);
  });
});
