import React from 'react';
import Input from '../../client/components/Input.jsx';
import { shallow } from 'enzyme';
import { isType } from 'graphql';
// import Adapter from 'enzyme-adapter-react-16';
// const input = require('../../components/Input');
// import toJson from 'enzyme-to-json';

//"react": "^17.0.1"
// npm install --save-dev enzyme enzyme-adapter-react-16 enzyme-to-json

// shallow test with state: 00:07:26
// https://www.youtube.com/watch?v=aSQ8v9JH5C8

// https://enzymejs.github.io/enzyme/

describe('Input component', () => {
  it('insert first test description', () => {
    const wrapper = shallow(<Input />);
  });
});
