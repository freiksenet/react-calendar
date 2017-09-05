import React from 'react';
import Month from './Month';
import { shallow } from 'enzyme';
import format from 'date-fns/format';

describe('<Month />', () => {
  const wrapper = shallow(<Month />);

  it('should render a month', () => {
    expect(wrapper.find('.rc-Month').length).toEqual(2);
  });

  it('should render a month header', () => {
    const monthHeader = wrapper.find('.rc-Month-header').text();
    const monthNameFormat = wrapper.instance().props.monthNameFormat;

    expect(monthHeader).toBe(format(new Date(), [monthNameFormat]));
  });

  it('should render a week day header', () => {
    expect(wrapper.find('.rc-Month-weekdays-weekday').length).toEqual(7);
  });

  it('should render at least 28 days', () => {
    expect(wrapper.find('.rc-Day').length).toBeGreaterThan(27);
  })
})
