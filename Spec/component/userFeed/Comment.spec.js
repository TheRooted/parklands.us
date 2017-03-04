import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Comment from './../../../public/components/userFeed/Comment.js';

describe('<Comment>', () => {
  it('should start with a no user', () => {
    const wrapper = shallow(<Comment/>);
    expect(wrapper.state('user')).to.equal('');
  });

  it('should have a strong tag', function () {
    const wrapper = shallow(<Comment/>);
    expect(wrapper.find('strong')).to.have.length(1);
  });

  it('should have props for componentWillMount', function () {
    const wrapper = shallow(<Comment/>);
    expect(wrapper.props().componentWillMount).to.be.defined;
  });
});