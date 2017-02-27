var sort = function (arr, criteria) {
  switch(criteria) {
    case 'rating':
      arr = sortByLikes(arr);
      return arr;
    case 'activity':
      arr = sortByActivity(arr);
      return arr;
    default:
      arr = sortByLikes(arr);
      return arr;
  }
};


var sortByLikes = function (arr) {
  return arr.sort(function (a, b) {
    return b.voteCount - a.voteCount;
  })
};

var sortByActivity = function (arr) {
  return arr.sort(function(a, b) {
    var aUpdatedArray = a.updatedAt.split('T');
    var aUpdatedDate = aUpdatedArray[0];
    var aUpdatedTime = aUpdatedArray[1];
    var bUpdatedArray = b.updatedAt.split('T');
    var bUpdatedDate = bUpdatedArray[0];
    var bUpdatedTime = bUpdatedArray[1];

    //sort by date updated
    aUpdatedDate = aUpdatedDate.split('-');
    bUpdatedDate = bUpdatedDate.split('-');
    for (var i = 0; i < aUpdatedDate.length; i++) {
      if (aUpdatedDate[i] !== bUpdatedDate[i]) {
        return bUpdatedDate[i] - aUpdatedDate[i];
      }
    }

    //sort by time updated
    aUpdatedTime = aUpdatedTime.split(':');
    bUpdatedTime = bUpdatedTime.split(':');
    for (var i = 0; i < (aUpdatedTime.length - 1); i++) {
      if (aUpdatedTime[i] !== bUpdatedTime[i]) {
        return bUpdatedTime[i] - aUpdatedTime[i];
      }
    }
    aUpdatedTime = aUpdatedTime[2].split('Z');
    bUpdatedTime = bUpdatedTime[2].split('Z');
    return bUpdatedTime[0] - aUpdatedTime[0];


  })
};

console.log(sort([
  {
  voteCount: 5,
  updatedAt: '2017-02-23 14:56:18.795-08'
  },
  {
  voteCount: 12,
  updatedAt: '2017-02-23 13:36:18.305-08'
  },
  {
  voteCount: 3,
  updatedAt: '2016-02-23 13:36:18.305-08'
  }], 'rating'))

console.log(sort([
  {
  voteCount: 5,
  updatedAt: '2017-02-27T04:17:06.033Z'
  },
  {
  voteCount: 1,
  updatedAt: '2017-02-27T04:17:07.033Z'
  },
  {
  voteCount: 3,
  updatedAt: '2017-02-27T04:17:08.033Z'
  }], 'activity'))
