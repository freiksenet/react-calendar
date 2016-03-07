import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import moment from 'moment';
import Month from '../src/Month';

describe('<Month />', () => {
  let wrapper;
  before(() => {
    wrapper = shallow(<Month date={ moment() } />);
  });

  it('should render 4 or 5 weeks depending on the month', () => {
    expect(wrapper.find('Week').length).to.be.gte(4);
  });
});
