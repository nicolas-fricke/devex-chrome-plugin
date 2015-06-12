var storageManager = storageManager || {};
storageManager.settings = storageManager.settings || {};
storageManager.watchlist = storageManager.watchlist || [];

storageManager.loadSettings = function() {
  chrome.storage.sync.get({
    trackingUrl: null,
    githubToken: null
  }, function(items) {
    storageManager.settings['trackingUrl'] = items.trackingUrl;
    storageManager.settings['githubToken'] = items.githubToken;

    $(document).trigger('settingsLoaded', storageManager.settings);
  });
};

storageManager.loadWatchList = function() {
  chrome.storage.sync.get({
    watchlist: []
  }, function(items) {
    storageManager.watchlist = items.watchlist;

    $(document).trigger('watchlistLoaded', storageManager.watchlist);
    $(document).trigger('watchlistChanged', storageManager.watchlist);
  });
};

storageManager.addToWatchList = function(newEntry) {
  storageManager.watchlist.push(newEntry);
  chrome.storage.sync.set({
    watchlist: storageManager.watchlist
  }, function() {
    $(document).trigger('watchlistEntryAdded', [storageManager.watchlist, newEntry]);
    $(document).trigger('watchlistChanged', storageManager.watchlist);

  });
};

$(document).ready(function(){
  storageManager.loadSettings();
  storageManager.loadWatchList();
});
