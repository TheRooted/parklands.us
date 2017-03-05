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

});
