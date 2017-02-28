import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import App from './../../public/components/App.js';

describe('<App/>', function () {
  if('should be true', function () {
    true === true;
  });
  // it('should have an nav to display the navigation', function () {
  //   const wrapper = shallow(<App/>);
  //   expect(wrapper.find('nav')).to.have.length(1);
  // });

  // it('should have props for email and src', function () {
  //   const wrapper = shallow(<Avatar/>);
  //   expect(wrapper.props().email).to.be.defined;
  //   expect(wrapper.props().src).to.be.defined;
  // });
});