import React from 'react';
import { browserHistory } from 'react-router';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';
import { equal } from 'assert';

import Comment from './../../../public/components/userFeed/Comment.js';
import PostComment from './../../../public/components/userFeed/PostComments.js';

describe('<PostComments>', () => {
  // const browserHistoryPushStub = stub(browserHistory, 'push', () => { });

  let sandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  it('should have props called allComments', function () {
    const wrapper = mount(<PostComment allComments={[]} />);
    expect(wrapper.find('div').children()).to.have.length(0)
  });

  it('should contain an <Comment/> component', function () {
    const wrapper = shallow(<PostComment allComments={[{}]}/>);
    expect(wrapper.find('div').children().find('Comment')).to.have.length(1);

  });

  //expect(wrapper.find('tbody').children()).to.have.length(cats.length);
    //  expect(wrapper.find('tbody').children().find('tr')).to.have.length(cats.length);
});
