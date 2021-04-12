import React from 'react';
import Input from '../../client/components/Input.jsx';
import { shallow } from 'enzyme';

describe('<Input />...', () => {
  const inputComponent = shallow(<Input />);
  it('...renders div element as the container', () => {
    expect(inputComponent.type()).toBe('div');
  });
  it('...div has class "input-container-outer"', () => {
    expect(inputComponent.hasClass('input-container-outer')).toBeTruthy();
  });
  it('...renders React component <Controlled />', () => {
    expect(inputComponent.text()).toBe('<Controlled />');
  });
});
