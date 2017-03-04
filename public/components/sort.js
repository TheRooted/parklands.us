var sort = function (arr, criteria) {
  switch(criteria) {
    case 'likes':
      arr = sortByLikes(arr);
      return arr;
    case 'activity':
      arr = sortByActivity(arr);
      return arr;
    case 'alphabetically':
      arr = sortAlphabetically(arr);
      return arr;
    case 'id':
      arr = sortById(arr);
      return arr;
    case 'created':
      arr = sortByCreatedAt(arr);
      return arr;
    case 'rating':
      arr = sortByRating(arr);
      return arr;
    default:
      arr = sortByLikes(arr);
      return arr;
  }
};

var sortById = function (arr) {
  return arr.sort(function(a, b) {
    return a.id - b.id;
  })
};

var sortByRating = function (arr) {
  return arr.sort(function(a, b) {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    } else {
      for (var i = 0; i < a.name.length; i++) {
        if (a.name[i] !== b.name[i]) {
          return a.name.charCodeAt(i) - b.name.charCodeAt(i);
        }
      }
    }
  })
};

var sortAlphabetically = function (arr) {
  return arr.sort(function (a, b) {
    for (var i = 0; i < a.name.length; i++) {
      if (a.name[i] !== b.name[i]) {
        return a.name.charCodeAt(i) - b.name.charCodeAt(i);
      }
    }
  });
};

var sortByLikes = function (arr) {
  return arr.sort(function (a, b) {
    return b.voteCount - a.voteCount;
  })
};

var sortByCreatedAt = function (arr) {
  return arr.sort(function(a, b) {
    var aCreatedArray = a.createdAt.split('T');
    var aCreatedDate = aCreatedArray[0];
    var aCreatedTime = aCreatedArray[1];
    var bCreatedArray = b.createdAt.split('T');
    var bCreatedDate = bCreatedArray[0];
    var bCreatedTime = bCreatedArray[1];

    //sort by date updated
    aCreatedDate = aCreatedDate.split('-');
    bCreatedDate = bCreatedDate.split('-');
    for (var i = 0; i < aCreatedDate.length; i++) {
      if (aCreatedDate[i] !== bCreatedDate[i]) {
        return bCreatedDate[i] - aCreatedDate[i];
      }
    }

    //sort by time updated
    aCreatedTime = aCreatedTime.split(':');
    bCreatedTime = bCreatedTime.split(':');
    for (var i = 0; i < (aCreatedTime.length - 1); i++) {
      if (aCreatedTime[i] !== bCreatedTime[i]) {
        return bCreatedTime[i] - aCreatedTime[i];
      }
    }
    aCreatedTime = aCreatedTime[2].split('Z');
    bCreatedTime = bCreatedTime[2].split('Z');
    return bCreatedTime[0] - aCreatedTime[0];


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


module.exports = sort;