import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import moment from 'moment';
import Day from '../src/Day';

describe('<Day />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<Day date={ moment() } />);
  });

  it('should render a single <Day />', () => {
    expect(wrapper.find('.rc-Day')).to.have.length(1);
  });
});
