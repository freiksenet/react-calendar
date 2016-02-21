import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import moment from 'moment';
import Month from '../src/Month2';

describe('<Month />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<Month date={ moment() } />);
  });

  it('should render 4 weeks', () => {
    wrapper.debug();
    expect(wrapper.find('Week')).to.have.length(5);
  });
});
