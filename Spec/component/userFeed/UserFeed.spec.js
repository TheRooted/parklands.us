import React from 'react';
import { browserHistory } from 'react-router';
import UserFeed from './../../../public/components/userFeed/UserFeed.js';
import SocialMediaFeed from './../../../public/components/userFeed/SocialMediaFeed.js';
import { Timeline } from 'react-twitter-widgets';
import Post from './../../../public/components/userTimeline/Post.js';
import sort from './../../../public/components/sort.js';
import loadMore from './../../../public/components/loadMore.js';

import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';
import { equal } from 'assert';


describe('<UserFeed>', () => {
  it('should render Timeline', () => {
    const wrapper = shallow(<UserFeed/>);

    expect(wrapper.find('div')
      .children().find('div')
      .children().find('Timeline')).to.have.length(1);
  });

  it('should have remainingFeed state', () => {
    const wrapper = shallow(<UserFeed/>);
    expect(wrapper.state('remainingFeed')).to.be.defined;
  });

  it('initial value of remainingFeed state should be ', () => {
    const wrapper = shallow(<UserFeed/>);
    expect(wrapper.state('remainingFeed')).to.eql([]);
  });

  it('should have photoCount state', () => {
    const wrapper = shallow(<UserFeed/>);
    expect(wrapper.state('photoCount')).to.be.defined;
  });

  it('initial value of photoCount state should be ', () => {
    const wrapper = shallow(<UserFeed/>);
    expect(wrapper.state('photoCount')).to.equal(10);
  });

  it('should have newFeed state', () => {
    const wrapper = shallow(<UserFeed/>);
    expect(wrapper.state('newFeed')).to.be.defined;
  });

  it('initial value of newFeed state should be ', () => {
    const wrapper = shallow(<UserFeed/>);
    expect(wrapper.state('newFeed')).to.eql([]);
  });
});

describe('<UserFeed>', () => {
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install();
  });

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  it('stub response for request URL', function (done) {
    // Match against an exact URL value
    moxios.stubRequest('/api/userfeed', {
      status: 200,
      responseText: 'response in userfeed'
    });

    let onFulfilled = sinon.spy();
    axios.get('/api/userfeed').then(onFulfilled);

    moxios.wait(function () {
      equal(onFulfilled.getCall(0).args[0].data, 'response in userfeed');
      done();
    });
  });
});

