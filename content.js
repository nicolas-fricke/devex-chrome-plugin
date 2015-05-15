var devexPlugin = {};

devexPlugin.getRepository = function() {
  var path = window.location.pathname.split('/');
  return path[1] + '/' + path[2];
};

devexPlugin.getPullRequestNumber = function() {
  return $('.gh-header-number').text();
};

devexPlugin.getPullRequestName = function() {
  return $('.js-issue-title').text();
};

devexPlugin.getPullRequestKey = function() {
  return devexPlugin.getRepository() + devexPlugin.getPullRequestNumber();
};

devexPlugin.addToWatchList = function() {
  devexPlugin.watchList[devexPlugin.getPullRequestKey()] = {
    repository: devexPlugin.getRepository(),
    pullRequestNumber: devexPlugin.getPullRequestNumber(),
    pullRequestName: devexPlugin.getPullRequestName()
  };
  chrome.storage.sync.set({watchList: devexPlugin.data}, function() { alert('successfully saved.'); });
};

devexPlugin.injectButton = function() {
  $('.gh-header-actions').append("<button id='btn-add-to-watchlist' class='btn btn-primary btn-sm'>Add to watchlist!</button>");

  $("#btn-add-to-watchlist").click(function(){
    devexPlugin.addToWatchList();
  });
};

devexPlugin.injectStatus = function() {
  $('.gh-header-actions').append("<div id='state-watching' class='state'>watching...</div>");
};

chrome.storage.sync.get('watchList', function(result) {
  devexPlugin.watchList = result.watchList || {};

  // check if this PR is on the watch list
  if ($.inArray(devexPlugin.getPullRequestKey(), Object.keys(devexPlugin.watchList)) != -1) {
    devexPlugin.injectStatus();
  } else {
    devexPlugin.injectButton();
  }
});
