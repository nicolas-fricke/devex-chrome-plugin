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
  chrome.runtime.sendMessage({type: 'watchlistAddEntry', entry: {
    repository: devexPlugin.getRepository(),
    pullRequestNumber: devexPlugin.getPullRequestNumber(),
    pullRequestName: devexPlugin.getPullRequestName()
  }}, function(response) {
    console.log(response.message);
  });
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

$(document).ready(function(){
  // TODO: send message to background and check status – maybe in separate function?
  devexPlugin.injectButton();
});
