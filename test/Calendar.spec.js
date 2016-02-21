import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import moment from 'moment';
import Calendar from '../src/Calendar2';

describe('<Calendar />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<Calendar firstMonth={1}
                                date={ moment('2014-01-01') }
                                weekNumbers={ true }
                                size={12} />);
  });

  it('should render a year', () => {
    expect(wrapper.find('Month')).to.have.length(12);
  });
});
