var loadMore = function (photosToLoad, displayArr, storageArr) {
  var display = displayArr.slice();
  var remaining = storageArr.slice();
  if (remaining.length > photosToLoad) {
    for (var i = 0; i < photosToLoad; i++) {
      display.push(remaining.shift());
    }
  } else {
    for (var i = 0; i < storageArr.length; i++) {
      display.push(remaining.shift());
    }
  }
  var results = [];
  results.push(display);
  results.push(remaining);
  return results;
}

module.exports = loadMore;