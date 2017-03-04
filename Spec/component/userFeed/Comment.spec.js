import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Comment from './../../../public/components/userFeed/Comment.js';

describe('<Comment>', () => {
  it('should start with a no user', () => {
    const wrapper = shallow(<Comment/>);
    expect(wrapper.state('user')).to.equal('');
  });

//   it('should have a button', function () {
//     const wrapper = shallow(<Email/>);
//     expect(wrapper.find('button')).to.have.length(1);
//   });

//   it('should have props for handleEmailChange and fetchGravatar', function () {
//     const wrapper = shallow(<Email/>);
//     expect(wrapper.props().handleEmailChange).to.be.defined;
//     expect(wrapper.props().fetchGravatar).to.be.defined;
//   });
});