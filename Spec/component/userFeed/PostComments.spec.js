import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import { equal } from 'assert';

import Comment from './../../../public/components/userFeed/Comment.js';
import PostComment from './../../../public/components/userFeed/PostComments.js';

describe('<PostComments>', () => {

  it('should have props called allComments', function () {
    const wrapper = mount(<PostComment allComments={[]} />);
    expect(wrapper.find('div').children()).to.have.length(0)
  });

  it('should contain an <Comment/> component', function () {
    const wrapper = mount(<PostComment allComments={[{}]}/>);
    expect(wrapper.find('div').children().find('Comment')).to.have.length(1);
  });
});
