import React from 'react';
import { browserHistory } from 'react-router';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import axios from 'axios';
import moxios from 'moxios';
import sinon from 'sinon';
import { equal } from 'assert';

import Comment from './../../../public/components/userFeed/Comment.js';

describe('<Comment>', () => {
  // const browserHistoryPushStub = stub(browserHistory, 'push', () => { });

  let sandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  it('should start with no user', () => {
    const wrapper = shallow(<Comment/>);
    expect(wrapper.state('user')).to.equal('');
  });

  it('should have a strong tag', () => {
    const wrapper = shallow(<Comment/>);
    expect(wrapper.find('strong')).to.have.length(1);
  });

  it('should have props for componentWillMount', () => {
    const wrapper = shallow(<Comment/>);
    expect(wrapper.props().componentWillMount).to.be.defined;
  });

  it('should have props for text', function () {
    const wrapper = shallow(<Comment/>);
    expect(wrapper.props().text).to.be.defined;
  });

  it('should have props for userId', function () {
    const wrapper = shallow(<Comment/>);
    expect(wrapper.props().userId).to.be.defined;
  });

});

describe('<Comment> should fetch data', () => {
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
    moxios.stubRequest('/api/username', {
      status: 200,
      responseText: 'Mr X'
    });

    let onFulfilled = sinon.spy();
    axios.get('/api/username').then(onFulfilled);

    moxios.wait(function () {
      equal(onFulfilled.getCall(0).args[0].data, 'Mr X');
      done();
    });
  });


});
