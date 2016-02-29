import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import moment from 'moment';
import Week from '../src/Week';

describe('<Week />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<Week date={ moment() } />);
  });

  it('should render 7 <Day />\'s', () => {
    expect(wrapper.find('Day')).to.have.length(7);
  });
});
